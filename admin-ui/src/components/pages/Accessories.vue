<template>
    <v-container fluid>
      <v-row class="d-flex justify-end mx-0 mb-3">
        <v-col cols="3" class="d-flex justify-end px-0">
          <v-btn @click="isAddProductModalActive = true" color="primary">
            Додати аксесуар
          </v-btn>
        </v-col>
      </v-row>

      <AccessoryWindow
        :isModalActive="isAddProductModalActive"
        @save="add"
        @close="isAddProductModalActive = false"
      />

      <v-row class="mx-0">
        <v-card width="100%">
          <v-row class="ma-0">
            <v-col :cols="12">
              <v-text-field
                v-model="tableSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-col>
            <v-col :cols="12" class="pa-0">
              <v-data-table
                :headers="headers"
                :items="dataList || []"
                :footer-props="footerProps"
                :items-per-page="25"
                :search="tableSearch"
                item-key="name"
                class="elevation-1"
              >
                <template v-slot:[`item.action`]="{ item }">
                  <v-btn @click="deleteAccessory(item.id)" text small>
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
import AccessoryApi from '@/api/accessory';
import AccessoryWindow from '@/components/common/accessory/AddWindow.vue';

export default {
  name: 'AccessoriesPage',
  components: {
    AccessoryWindow,
  },
  data: () => ({
    backEndUrl: process.env.VUE_APP_API_URL,
    tableSearch: '',
    isAddProductModalActive: false,
    dataList: [],
    data: [],
    headers: [
      {
        text: 'Назва', align: 'center', sortable: true, value: 'name',
      },
      {
        text: 'Ціна (₴)', align: 'center', sortable: true, value: 'price',
      },
      {
        text: 'Кількість', align: 'center', sortable: true, value: 'quantity',
      },
      {
        text: '', align: 'center', value: 'action',
      },
    ],
    actionsHeader: {
      text: '', align: 'center', sortable: false, value: 'action',
    },
    footerProps: {
      'items-per-page-options': [
        25, 50, 100, -1,
      ],
    },
  }),
  mounted() {
    if (!this.$cookies.get('userEmail')) {
      this.$router.push('/authorize');
    } else {
      this.getAccessoriesList();
    }
  },
  methods: {
    async getAccessoriesList() {
      this.dataList = await AccessoryApi.list();
    },
    async add(data) {
      await AccessoryApi.add(data);
      await this.getAccessoriesList();
      this.isAddProductModalActive = false;
    },
    async deleteAccessory(id) {
      await AccessoryApi.delete({ id });
      await this.getAccessoriesList();
    },
  },
};
</script>
