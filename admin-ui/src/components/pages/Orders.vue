<template>
  <v-row class="justify-start pt-3 mx-0">
    <v-col :cols="12" class="d-flex justify-end">
      <v-btn @click="isModalActive = true" color="primary">
        Сформувати обслуговування
      </v-btn>
    </v-col>
    <v-col
      v-for="(order, index) in ordersList"
      :key="index"
      :cols="4"
    >
      <v-card>
        <v-card-title>
          Замовлення №{{order.id}}
        </v-card-title>

        <v-divider />

        <v-card-text>
          <v-container fluid class="pb-0 px-0">
            <span class="font-weight-bold">Статус:</span>
            {{ order.status }}
          </v-container>
          <v-container fluid class="pb-0 px-0">
            <span class="font-weight-bold">Дата замовлення:</span>
            {{ order.dateAdded }}
          </v-container>
          <v-container fluid class="pb-0 px-0">
            <span class="font-weight-bold">Авто:</span>
            {{ order.car }}
          </v-container>
          <v-container fluid class="pb-0 px-0">
            <span class="font-weight-bold">VIN:</span>
            {{ order.vin }}
          </v-container>
          <v-container fluid class="pb-0 px-0">
            <span class="font-weight-bold">Клієнт:</span>
            {{ order.clientData }}
          </v-container>
          <v-container fluid class="pb-0 px-0">
            <span class="font-weight-bold">Опис:</span>
            {{ order.description }}
          </v-container>
          <v-container fluid class="d-flex justify-center">
            <v-btn color="success" @click="deleteOrder(order.id)">
              Завершити замовлення
            </v-btn>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>

    <v-dialog v-model="isModalActive" width="600">
      <v-card>
        <v-card-title>
          Сформувати замовлення
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col :cols="6">
              <v-autocomplete
                ref="client"
                v-model="createOrder.clientId"
                :rules="[(client) => !!client || 'Обов’язково оберіть клієнта']"
                :items="clientList"
                item-text="namePhone"
                item-value="id"
                label="Клієнт"
                placeholder="Оберіть клієнта"
                required
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                  label="Авто"
                  required
                  v-model="createOrder.car"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                  label="VIN"
                  required
                  v-model="createOrder.vin"
              />
            </v-col>
            <v-col :cols="6">
              <v-select
                :items="[
                  'Планове ТО',
                  'Відновлення після ДТП',
                  'Діагностика',
                  'Обслуговування авто'
                ]"
                label="Оберіть тип сервісу"
                v-model="createOrder.serviceType"
              />
            </v-col>
            <v-col :cols="12">
              <v-textarea
                solo
                name="description"
                label="Опис причини звернення до сервісу"
                v-model="createOrder.description"
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
              @click="addOrder"
          >
            Зберегти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ClientApi from '@/api/client';
import ServiceOrder from '@/api/serviceOrder';

export default {
  name: 'OrdersPage',
  data: () => ({
    estimatedFinishDate: {},
    openMenusList: {},
    isModalActive: false,
    clientList: [],
    createOrder: {
      car: '',
      vin: '',
      clientId: '',
      description: '',
      serviceType: null,
    },
    ordersList: [],
  }),
  mounted() {
    if (!this.$cookies.get('userEmail')) {
      this.$router.push('/authorize');
    } else {
      this.getOrders();
      this.getUserListFromApi();
    }
  },
  methods: {
    async getUserListFromApi() {
      this.clientList = await ClientApi.getList();
    },
    async deleteOrder(id) {
      await ServiceOrder.delete({ id });
      await this.getOrders();
    },
    async addOrder() {
      await ServiceOrder.add({ ...this.createOrder });
      this.createOrder = {
        car: '',
        vin: '',
        clientId: '',
        description: '',
        serviceType: null,
      };
      await this.getOrders();
      this.isModalActive = false;
    },
    async getOrders() {
      this.ordersList = await ServiceOrder.list();
    },
  },
};
</script>