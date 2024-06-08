<template>
    <v-row justify="center">
      <v-dialog
        :value="isModalActive"
        width="600"
        @click:outside="close"
      >
        <v-card>
          <v-card-title>
            Продати авто
          </v-card-title>

          <v-card-text>
            <v-row class="py-0">
              <v-col :cols="12">
                <v-select
                  :items="clientsList"
                  item-text="name"
                  item-value="id"
                  v-model="sale.clientId"
                  label="Клієнт"
                />
              </v-col>
              <v-col :cols="12">
                <v-autocomplete
                    ref="cars"
                    v-model="sale.carId"
                    :rules="[(client) => !!client || 'Оберіть авто']"
                    :items="carInfo"
                    item-text="car"
                    item-value="id"
                    label="Автомобілі"
                    placeholder="Оберіть авто"
                    chips
                    deletable-chips
                    required
                />
              </v-col>
              <v-col :cols=12>
                <v-text-field
                  :rules="[rules.required, rules.length]"
                  label="VIN код"
                  required
                  v-model="sale.vin"
                />
              </v-col>
              <v-col :cols=12>
                <p class="font-weight-black text-center">
                    Сума замовлення: {{ orderSum }}₴
                </p>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              Закрити
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="saleCar"
              :disabled="!sale.carId || !sale.clientId || sale.vin.length === 0"
            >
              Продати
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<script>
import ClientApi from '@/api/client';
import CarApi from '@/api/car';

export default {
  name: 'SaleCarWindow',
  props: {
    isModalActive: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    clientsList: [],
    carsList: [],
    sale: {
      vin: '',
      clientId: null,
      carId: null,
    },
    rules: {
      required: (value) => !!value || 'Це поле обов’язкове для заповнення',
      length: (v) => v.length === 17 || 'VIN-код має містити 17 символів',
    },
  }),
  async mounted() {
    if (!this.$cookies.get('userEmail')) {
      this.$router.push('/authorize');
    } else {
      await this.getCarsList();
      await this.getClientsList();
    }
  },
  computed: {
    isSaleButtonAvailable() {
      return this.sale.vin.length > 0 && !!this.sale.clientId && !!this.sale.carId;
    },
    orderSum() {
      let price = null;
      this.carsList.forEach((car) => {
        if (car.id === this.sale.carId) {
          price = car.price;
        }
      });
      return price;
    },
    carInfo() {
      const result = [];
      this.carsList.forEach((value) => {
        result.push({
          car: `${value.color} ${value.model} ${value.equipment} ${value.engine_capacity} ${value.engine_type}`,
          id: value.id,
        });
      });
      return result;
    },
  },
  methods: {
    saleCar() {
      this.$emit('sale', this.sale);
    },
    close() {
      this.$emit('close');
    },
    async getCarsList() {
      this.carsList = await CarApi.list();
    },
    async getClientsList() {
      this.clientsList = await ClientApi.getList();
    },
  },
};
</script>

  <style scoped>

  </style>
