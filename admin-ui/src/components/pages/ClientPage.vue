<template>
    <v-container fluid>
      <v-row class="d-flex justify-end mb-3">
        <v-col cols="2" class="d-flex justify-end">
          <v-btn @click="isModalActive = true" color="primary">
            Додати клієнта
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="isModalActive" width="600">
          <v-card>
            <v-card-title>
              Додати клієнта
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
                    <v-text-field
                      label="Авто"
                      required
                      v-model="addUserData.car"
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
              Редагування клієнта
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
                    <v-text-field
                      label="Авто"
                      required
                      v-model="editUserData.car"
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
        <template v-slot:[`item.action`]="{ item }">
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
import ClientApi from '@/api/client';

export default {
  name: 'ClientPage',
  data: () => ({
    isModalActive: false,
    isEditModalActive: false,
    isPassShowed: false,
    addUserData: {
      name: '',
      email: '',
      phone: '',
      car: '',
    },
    editUserData: {
      id: '',
      name: '',
      email: '',
      phone: '',
      car: '',
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
        text: 'Авто', align: 'center', sortable: true, value: 'car',
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
    return this.getUserListFromApi();
  },
  methods: {
    async getUserListFromApi() {
      this.data = await ClientApi.getList();
    },
    async addUser() {
      this.data.push(this.addUserData);

      await ClientApi.create({
        name: this.addUserData.name,
        email: this.addUserData.email,
        phone: this.addUserData.phone,
        car: this.addUserData.car,
      });

      this.isModalActive = false;
      this.addUserData = {
        name: '',
        email: '',
        phone: '',
        status: '',
        car: '',
      };
    },
    async editUser() {
      await ClientApi.update({
        id: this.editUserData.id,
        name: this.editUserData.name,
        email: this.editUserData.email,
        phone: this.editUserData.phone,
        car: this.editUserData.car,
      });

      const { email } = this.editUserData;
      const foundIndex = this.data.findIndex((row) => row.email === email);
      this.data.splice(foundIndex, 1, this.editUserData);
      this.isEditModalActive = false;
    },
    async deleteUser(data) {
      await ClientApi.delete({ id: data.id });
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
