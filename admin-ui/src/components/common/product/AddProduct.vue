<template>
  <v-row justify="center">
    <v-dialog
      :value="isModalActive"
      width="600"
      @click:outside="close"
    >
      <v-card>
        <v-card-title>
          Додати авто
        </v-card-title>

        <v-card-text>
          <v-row class="py-0">
            <v-col :cols="6">
              <v-text-field
                label="Комплектація"
                required
                v-model="addProductData.equipment"
              />
            </v-col>
            <v-col :cols="6">
              <v-select
                :items="['Бензин', 'Дизель', 'Гібрид', 'Електро']"
                v-model="addProductData.engineType"
                label="Тип двигуна"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                label="Об’єм двигуна"
                required
                v-model="addProductData.engineCapacity"
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
                v-model="addProductData.brandId"
                label="Бренд"
              />
            </v-col>
            <v-col :cols="6">
              <v-select
                :items="colorList"
                item-text="name"
                item-value="id"
                v-model="addProductData.colorId"
                label="Колір"
              />
            </v-col>
            <v-col :cols="6">
              <v-select
                :items="modelList"
                item-text="name"
                item-value="id"
                v-model="addProductData.modelId"
                label="Модель"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                label="Кількість"
                required
                v-model="addProductData.quantity"
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
            Закрыть
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Сохранить
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
    colorList: {
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
      equipment: null,
      engineType: null,
      engineCapacity: null,
      price: null,
      quantity: null,
      brandId: null,
      modelId: null,
      colorId: null,
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
