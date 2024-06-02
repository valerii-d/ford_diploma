<template>
    <v-container fluid>
      <AddWindow
        :is-modal-active="isAddProductModalActive"
        :brand-list="brandList"
        :model-list="modelList"
        @addProduct="addProduct"
        @close="isAddProductModalActive = !isAddProductModalActive"
      />

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
                Додати запчастини
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
                  <v-btn @click="deleteProduct(item.id)" text small>
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
import BrandApi from '@/api/brand';
import ModelApi from '@/api/model';
import PartsApi from '@/api/parts';
import AddWindow from '@/components/common/parts/AddWindow.vue';

export default {
  name: 'AutoWarhousePage',
  components: {
    AddWindow,
  },
  data: () => ({
    backEndUrl: process.env.VUE_APP_API_URL,
    tableSearch: '',
    isAddProductModalActive: false,
    isIncomeModalActive: false,
    brandList: [],
    modelList: [],
    data: [],
    headers: [
      {
        text: 'Назва', align: 'center', sortable: true, value: 'name',
      },
      {
        text: 'Ціна (₴)', align: 'center', sortable: true, value: 'price',
      },
      {
        text: 'Сумісний бренд', align: 'center', sortable: true, value: 'brandCompatibilityName',
      },
      {
        text: 'Сумісна модель', align: 'center', sortable: true, value: 'modelCompatibilityName',
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
      this.getPartsList();
      this.getBrandList();
      this.getModelList();
    }
  },
  methods: {
    async getBrandList() {
      this.brandList = await BrandApi.list();
    },
    async getModelList() {
      this.modelList = await ModelApi.list();
    },
    async addProduct(data) {
      await PartsApi.add(data);
      this.isAddProductModalActive = false;
      await this.getPartsList();
    },
    async deleteProduct(id) {
      await PartsApi.delete({ id });
      await this.getPartsList();
    },
    async getPartsList() {
      this.data = await PartsApi.list();
    },
  },
};
</script>
