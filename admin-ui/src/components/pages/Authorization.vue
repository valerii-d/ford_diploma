<template>
  <v-row class="mx-0 justify-space-around align-center auth-row">
    <v-col lg="3" md="3" sm="5" xs="12">
      <v-card>
        <v-card-title class="d-flex justify-center">
          Вхід
        </v-card-title>
        <v-card-text>
          <v-row class="mx-0 justify-center">
            <v-col cols="10" class="px-0">
              <v-text-field
                  label="Логін"
                  required
                  v-model="email"
              />
            </v-col>
            <v-col cols="10" class="px-0">
              <v-text-field
                  :append-icon="isPassShown ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="isPassShown ? 'text' : 'password'"
                  name="input-10-2"
                  label="Пароль"
                  hint="At least 8 characters"
                  value=""
                  v-model="password"
                  class="input-group--focused"
                  @click:append="isPassShown = !isPassShown"
              />
            </v-col>

            <v-col
                v-if="errorMsg.length > 0"
                cols="10"
                style="color: red;text-align: center"
                class="pa-0"
            >
              {{ errorMsg }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="primary" @click="signIn">
            Увійти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import adminApi from '@/api/admin';
import hash from '@/helpers/hash';

export default {
  name: 'AuthorizationPage',
  data: () => ({
    email: '',
    password: '',
    isPassShown: false,
    errorMsg: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match'),
    },
    dataToLogIn: {
      login: 'admin@gmail.com',
      pass: 'adminQwerty554',
    },
  }),
  mounted() {
    if (this.$cookies.get('userEmail')) {
      this.$router.push('/');
    }
  },
  methods: {
    async signIn() {
      try {
        const result = await adminApi.getAdminByEmailAndPass({
          email: this.email,
          password: hash(this.password),
        });
        console.log(result);
        if (!result?.length) {
          this.errorMsg = 'Невірно введений логін або пароль';
          return;
        }
        this.$cookies.set('userEmail', result[0].email);
        this.$cookies.set('userName', result[0].name);
        this.$cookies.set('userRole', result[0].role);
        this.$router.push('/');
      } catch (error) {
        this.errorMsg = 'Щось пішло не так, спробуйте ще';
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.auth-row
  padding-top: 15%
</style>
