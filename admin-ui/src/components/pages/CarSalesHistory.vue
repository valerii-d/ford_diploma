<template>
    <v-container fluid>
      <AddProduct
        :is-modal-active="isSaleModalActive"
        @sale="saleCar"
        @close="isSaleModalActive = !isSaleModalActive"
      />

      <!-- <Income
        :is-modal-active="isIncomeModalActive"
        :data="selectedRows"
        @close="isIncomeModalActive = !isIncomeModalActive"
        @save="saveIncome($event)"
      /> -->

      <v-row class="mx-0 mt-8">
        <v-card width="100%">
          <v-row class="ma-0">
            <v-col :cols="6">
              <v-text-field
                v-model="tableSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-col>
            <v-col :cols="6" class="d-flex justify-end">
              <v-btn
                v-if="['Генеральний директор', 'Продавець консультант'].includes(userRole)"
                @click="isSaleModalActive = true"
                color="primary"
              >
                Продати авто
              </v-btn>
            </v-col>
            <v-col :cols="12" class="pa-0">
              <v-data-table
                :headers="headers"
                :items="data || []"
                :footer-props="footerProps"
                :items-per-page="25"
                :search="tableSearch"
                item-key="name"
                class="elevation-1"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </template>

<script>
import CarSalesHistoryApi from '@/api/salesHistory';
import AddProduct from '@/components/common/salesHistory/SaleCarWindow.vue';

export default {
  name: 'AutoWarhousePage',
  components: {
    AddProduct,
  },
  data: () => ({
    userRole: '',
    backEndUrl: process.env.VUE_APP_API_URL,
    tableSearch: '',
    isSaleModalActive: false,
    data: [],
    headers: [
      {
        text: 'Модель', align: 'center', sortable: true, value: 'carModel',
      },
      {
        text: 'Колір', align: 'center', sortable: true, value: 'carColor',
      },
      {
        text: 'Комплектація', align: 'center', sortable: true, value: 'carEquipment',
      },
      {
        text: 'Тип двигуна', align: 'center', sortable: true, value: 'carEngineType',
      },
      {
        text: 'Об’єм двигуна', align: 'center', sortable: true, value: 'carEngineCapacity',
      },
      {
        text: 'Ціна (₴)', align: 'center', sortable: true, value: 'carPrice',
      },
      {
        text: 'Клієнт', align: 'center', sortable: true, value: 'clientInfo',
      },
      {
        text: 'Дата продажу', align: 'center', sortable: true, value: 'dateAdded',
      },
      {
        text: '', align: 'center', value: 'action',
      },
    ],
    footerProps: {
      'items-per-page-options': [
        15, 25, 50, -1,
      ],
    },
  }),
  mounted() {
    if (!this.$cookies.get('userEmail')) {
      this.$router.push('/authorize');
    } else {
      this.userRole = this.$cookies.get('userRole');
      this.getCarSalesList();
    }
  },
  methods: {
    async saleCar(data) {
      await CarSalesHistoryApi.carsAdd(data);
      this.isSaleModalActive = false;
      await this.getCarSalesList();
    },
    async getCarSalesList() {
      this.data = await CarSalesHistoryApi.carsList();
    },
  },
};
</script>
