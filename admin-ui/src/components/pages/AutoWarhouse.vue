<template>
  <v-container fluid>
    <AddProduct
      :is-modal-active="isAddProductModalActive"
      :brand-list="brandList"
      :color-list="colorList"
      :model-list="modelList"
      @addProduct="addProduct"
      @close="isAddProductModalActive = !isAddProductModalActive"
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
            <v-btn @click="isAddProductModalActive = true" color="primary">
              Додати авто
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
            >
              <template v-slot:[`item.action`]="{ item }">
                <!-- <v-btn @click="onAddSubProductClick(item)" text small>
                  <v-icon
                    small
                    color="green"
                  >
                    mdi-plus-box
                  </v-icon>
                </v-btn> -->
                <v-btn :key="item.id" @click="deleteProduct(item.id)" text small>
                  <v-icon small color="red">
                    mdi-delete-outline
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ColorApi from '@/api/color';
import BrandApi from '@/api/brand';
import ModelApi from '@/api/model';
import CarApi from '@/api/car';
import AddProduct from '@/components/common/product/AddProduct.vue';

export default {
  name: 'AutoWarhousePage',
  components: {
    AddProduct,
  },
  data: () => ({
    backEndUrl: process.env.VUE_APP_API_URL,
    tableSearch: '',
    isAddProductModalActive: false,
    isIncomeModalActive: false,
    brandList: [],
    colorList: [],
    modelList: [],
    data: [],
    headers: [
      {
        text: 'Модель', align: 'center', sortable: true, value: 'name',
      },
      {
        text: 'Колір', align: 'center', sortable: true, value: 'color',
      },
      {
        text: 'Комплектація', align: 'center', sortable: true, value: 'equipment',
      },
      {
        text: 'Тип двигуна', align: 'center', sortable: true, value: 'engine_type',
      },
      {
        text: 'Об’єм двигуна', align: 'center', sortable: true, value: 'engine_capacity',
      },
      {
        text: 'Залишок (од.)', align: 'center', sortable: true, value: 'quantity',
      },
      {
        text: 'Ціна (₴)', align: 'center', sortable: true, value: 'price',
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
      this.getCarList();
      this.getBrandList();
      this.getColorList();
      this.getModelList();
    }
  },
  methods: {
    async getBrandList() {
      this.brandList = await BrandApi.list();
    },
    async getColorList() {
      this.colorList = await ColorApi.list();
    },
    async getModelList() {
      this.modelList = await ModelApi.list();
    },
    async addProduct(data) {
      await CarApi.add(data);
      this.isAddProductModalActive = false;
      await this.getCarList();
    },
    async saveIncome(data) {
      await CarApi.income(data);
      this.isIncomeModalActive = false;
      await this.getCarList();
    },
    async deleteProduct(id) {
      console.log(id);
      await CarApi.delete({ id });
      await this.getCarList();
    },
    async getCarList() {
      this.data = await CarApi.list();
    },
  },
};
</script>
