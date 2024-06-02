<template>
    <v-container fluid>
      <v-row class="mx-0" no-gutters>
        <v-col :cols="6" class="pa-4">
            <AddWindow
                entity="Бренд"
                :isModalActive="isAddBrandModalActive"
                @save="addBrand"
                @close="isAddBrandModalActive = false"
            />
            <v-card width="100%">
                <v-row class="ma-0" no-gutters>
                    <v-col :cols="5" class="px-2">
                        <v-text-field
                            v-model="brandsSearch"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        />
                    </v-col>
                    <v-col :cols="7" class="d-flex justify-end align-center pr-4">
                        <v-btn @click="isAddBrandModalActive = true" color="primary">
                            Додати бренд
                        </v-btn>
                    </v-col>
                    <v-col :cols="12" class="px-0 pt-5">
                        <v-data-table
                            :headers="headers"
                            :items="brandsList || []"
                            :footer-props="footerProps"
                            :items-per-page="25"
                            :search="brandsSearch"
                            item-key="name"
                            class="elevation-1"
                        >
                            <template v-slot:[`item.action`]="{ item }">
                                <v-btn @click="deleteBrand(item.id)" text small>
                                    <v-icon small color="red">
                                        mdi-delete-outline
                                    </v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col :cols="6" class="pa-4">
            <AddWindow
                entity="Модель"
                :isModalActive="isAddModelModalActive"
                @save="addModel"
                @close="isAddModelModalActive = false"
            />
            <v-card width="100%">
                <v-row class="ma-0" no-gutters>
                    <v-col :cols="5" class="px-2">
                        <v-text-field
                            v-model="modelsSearch"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        />
                    </v-col>
                    <v-col :cols="7" class="d-flex justify-end align-center pr-4">
                        <v-btn @click="isAddModelModalActive = true" color="primary">
                            Додати модель
                        </v-btn>
                    </v-col>
                    <v-col :cols="12" class="px-0 pt-5">
                        <v-data-table
                            :headers="headers"
                            :items="modelsList || []"
                            :footer-props="footerProps"
                            :items-per-page="25"
                            :search="modelsSearch"
                            item-key="name"
                            class="elevation-1"
                        >
                            <template v-slot:[`item.action`]="{ item }">
                                <v-btn @click="deleteModel(item.id)" text small>
                                    <v-icon small color="red">
                                        mdi-delete-outline
                                    </v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col :cols="6" class="pa-4">
            <AddWindow
                entity="Колір"
                :isModalActive="isAddColorModalActive"
                @save="addColor"
                @close="isAddColorModalActive = false"
            />
            <v-card width="100%">
                <v-row class="ma-0" no-gutters>
                    <v-col :cols="5" class="px-2">
                        <v-text-field
                            v-model="colorsSearch"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        />
                    </v-col>
                    <v-col :cols="7" class="d-flex justify-end align-center pr-4">
                        <v-btn @click="isAddColorModalActive = true" color="primary">
                            Додати колір
                        </v-btn>
                    </v-col>
                    <v-col :cols="12" class="px-0 pt-5">
                        <v-data-table
                            :headers="headers"
                            :items="colorsList || []"
                            :footer-props="footerProps"
                            :items-per-page="25"
                            :search="colorsSearch"
                            item-key="name"
                            class="elevation-1"
                        >
                            <template v-slot:[`item.action`]="{ item }">
                                <v-btn @click="deleteColor(item.id)" text small>
                                    <v-icon small color="red">
                                        mdi-delete-outline
                                    </v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import ColorApi from '@/api/color';
import BrandApi from '@/api/brand';
import ModelApi from '@/api/model';
import AddWindow from '@/components/common/AddWindow.vue';

export default {
  name: 'CarSettings',
  components: {
    AddWindow,
  },
  data: () => ({
    backEndUrl: process.env.VUE_APP_API_URL,
    colorsSearch: '',
    brandsSearch: '',
    modelsSearch: '',
    isAddColorModalActive: false,
    isAddBrandModalActive: false,
    isAddModelModalActive: false,
    colorsList: [],
    brandsList: [],
    modelsList: [],
    data: [],
    headers: [
      {
        text: 'Назва', align: 'center', sortable: true, value: 'name',
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
      this.getColorsList();
      this.getBrandsList();
      this.getModelsList();
    }
  },
  methods: {
    async getColorsList() {
      this.colorsList = await ColorApi.list();
    },
    async getBrandsList() {
      this.brandsList = await BrandApi.list();
    },
    async getModelsList() {
      this.modelsList = await ModelApi.list();
    },
    async addColor(data) {
      await ColorApi.add(data);
      await this.getColorsList();
      this.isAddColorModalActive = false;
    },
    async addBrand(data) {
      await BrandApi.add(data);
      await this.getBrandsList();
      this.isAddBrandModalActive = false;
    },
    async addModel(data) {
      await ModelApi.add(data);
      await this.getModelsList();
      this.isAddModelModalActive = false;
    },
    async deleteColor(id) {
      await ColorApi.delete({ id });
      await this.getColorsList();
    },
    async deleteBrand(id) {
      await BrandApi.delete({ id });
      await this.getBrandsList();
    },
    async deleteModel(id) {
      await ModelApi.delete({ id });
      await this.getModelsList();
    },
  },
};
</script>
