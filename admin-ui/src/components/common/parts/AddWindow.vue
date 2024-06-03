<template>
    <v-row justify="center">
      <v-dialog
        :value="isModalActive"
        width="600"
        @click:outside="close"
      >
        <v-card>
          <v-card-title>
            Додати запчастини
          </v-card-title>

          <v-card-text>
            <v-row class="py-0">
              <v-col :cols="6">
                <v-text-field
                  label="Назва"
                  required
                  v-model="addProductData.name"
                />
              </v-col>
              <v-col :cols="6">
                <v-text-field
                  label="Ціна (грн)"
                  required
                  v-model="addProductData.price"
                />
              </v-col>
              <v-col :cols="6">
                <v-select
                  :items="brandList"
                  item-text="name"
                  item-value="id"
                  v-model="addProductData.compatibilityBrandId"
                  label="Бренд"
                />
              </v-col>
              <v-col :cols="6">
                <v-select
                  :items="modelList"
                  item-text="name"
                  item-value="id"
                  v-model="addProductData.compatibilityModelId"
                  label="Модель"
                />
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
              @click="save"
            >
              Зберегти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<script>
export default {
  name: 'AddProduct',
  props: {
    brandList: {
      type: Array,
      default: () => ([]),
    },
    modelList: {
      type: Array,
      default: () => ([]),
    },
    isModalActive: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    addProductData: {
      name: null,
      price: null,
      compatibilityBrandId: null,
      compatibilityModelId: null,
    },
  }),
  methods: {
    async save() {
      this.$emit('addProduct', this.addProductData);
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

  <style scoped>

  </style>
