<template>
  <v-container fluid>
    <v-row v-if="canEdit" class="d-flex justify-end mb-3">
      <v-col cols="2" class="d-flex justify-end">
        <v-btn @click="isModalActive = true" color="primary">
          Додати співробітника
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center" class="py-5">
      <v-dialog v-model="isModalActive" width="600">
        <v-card>
          <v-card-title>
            Додати співробітника
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col :cols="6">
                <v-text-field
                    label="Ім’я та Фамілія"
                    required
                    v-model="addUserData.name"
                />
              </v-col>
              <v-col :cols="6">
                <v-text-field
                    label="Email"
                    required
                    v-model="addUserData.email"
                />
              </v-col>
              <v-col :cols="6">
                <v-text-field
                    label="Номер телефону"
                    required
                    v-model="addUserData.phone"
                />
              </v-col>
              <v-col :cols="6">
                <v-select
                  :items="[
                    'Генеральний директор',
                    'Автомеханік',
                    'Продавець консультант',
                    'Бугалтер'
                  ]"
                  label="Посада"
                  required
                  v-model="addUserData.role"
                />
              </v-col>
              <v-col :cols="6">
                <v-text-field
                  v-model="addUserData.password"
                  :append-icon="isPassShowed ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isPassShowed ? 'text' : 'password'"
                  name="input-10-1"
                  label="Пароль"
                  hint="Пароль має складатися хоча б з 8 символів"
                  counter
                  @click:append="isPassShowed = !isPassShowed"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn
                color="blue darken-1"
                text
                @click="isModalActive = false"
            >
              Закрити
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="addUser"
            >
              Зберегти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="isEditModalActive" width="600">
        <v-card>
          <v-card-title>
            Редагування користувача
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col :cols="6">
                <v-text-field
                    label="Ім’я"
                    required
                    v-model="editUserData.name"
                />
              </v-col>
              <v-col :cols="6">
                <v-text-field
                    label="Email"
                    required
                    v-model="editUserData.email"
                />
              </v-col>
              <v-col :cols="6">
                <v-text-field
                    label="Номер телефону"
                    required
                    v-model="editUserData.phone"
                />
              </v-col>
              <v-col :cols="6">
                <v-select
                    :items="[
                      'Генеральний директор',
                      'Автомеханік',
                      'Продавець консультант',
                      'Бугалтер'
                    ]"
                    label="Посада"
                    required
                    v-model="editUserData.role"
                />
              </v-col>
              <v-col :cols="6">
                <v-text-field
                  v-model="editUserData.password"
                  :append-icon="isPassShowed ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isPassShowed ? 'text' : 'password'"
                  name="input-10-1"
                  label="Пароль"
                  hint="Пароль має складатися хоча б з 8 символів"
                  counter
                  @click:append="isPassShowed = !isPassShowed"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn
                color="blue darken-1"
                text
                @click="isEditModalActive = false"
            >
              Закрити
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="editUser"
            >
              Зберегти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-if="canEdit" v-slot:[`item.action`]="{ item }">
        <v-btn text>
          <v-icon @click="editUserOpenModal(item)" color="orange">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn @click="deleteUser(item)" text>
          <v-icon color="red">
            mdi-delete-outline
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import AdminApi from '@/api/admin';
import hash from '@/helpers/hash';

export default {
  name: 'AdminsPage',
  data: () => ({
    canEdit: true,
    isModalActive: false,
    isEditModalActive: false,
    isPassShowed: false,
    addUserData: {
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
    },
    editUserData: {
      id: '',
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      prevPassword: '',
    },
    headers: [
      {
        text: 'Ім’я', align: 'center', sortable: true, value: 'name',
      },
      {
        text: 'E-mail', align: 'center', sortable: true, value: 'email',
      },
      {
        text: 'Номер телефону', align: 'center', sortable: true, value: 'phone',
      },
      {
        text: 'Посада', align: 'center', sortable: true, value: 'role',
      },
      {
        text: 'Дії', align: 'center', sortable: true, value: 'action',
      },
    ],
    data: [],
  }),
  mounted() {
    if (!this.$cookies.get('userEmail')) {
      return this.$router.push('/authorize');
    }
    const userRole = this.$cookies.get('userRole');
    this.canEdit = ['Генеральний директор'].includes(userRole);
    return this.getUserListFromApi();
  },
  methods: {
    async getUserListFromApi() {
      this.data = await AdminApi.getAdminsList();
    },
    async addUser() {
      this.data.push(this.addUserData);

      await AdminApi.createAdmin({
        name: this.addUserData.name,
        email: this.addUserData.email,
        password: hash(this.addUserData.password),
        phone: this.addUserData.phone,
        role: this.addUserData.role,
      });

      this.isModalActive = false;
      this.addUserData = {
        name: '',
        email: '',
        phone: '',
        status: '',
        role: '',
      };
    },
    async editUser() {
      const passwordToSet = !this.editUserData.password
        ? this.editUserData.prevPassword
        : this.editUserData.password;
      console.log(!this.editUserData.password, this.editUserData.password);
      await AdminApi.updateAdminData({
        id: this.editUserData.id,
        name: this.editUserData.name,
        email: this.editUserData.email,
        password: hash(passwordToSet),
        phone: this.editUserData.phone,
        role: this.editUserData.role,
      });

      const { email } = this.editUserData;
      const foundIndex = this.data.findIndex((row) => row.email === email);
      this.data.splice(foundIndex, 1, this.editUserData);
      this.isEditModalActive = false;
    },
    async deleteUser(data) {
      await AdminApi.deleteAdmin({ id: data.id });
      const foundIndex = this.data.findIndex((row) => row.email === data.email);
      this.data.splice(foundIndex, 1);
    },
    editUserOpenModal(item) {
      this.editUserData = { ...item };
      this.editUserData.password = '';
      this.editUserData.prevPassword = item.password;
      this.isEditModalActive = true;
    },
  },
};
</script>
