<template>
  <v-row justify="center">
    <v-dialog
      :value="isModalActive"
      width="60%"
      @click:outside="close"
    >
      <v-card>
        <v-card-title>
          Приход товара
        </v-card-title>

        <v-card-text>
          <v-row
            v-for="(value, index) in data"
            :key="index"
            class="ma-0 mb-2"
          >
            <v-card width="100%" height="fit-content">
              <v-card-text>
                <v-row class="ma-0">
                  <v-col
                    :cols="6"
                    class="py-0"
                  >
                    <v-text-field
                      label="Название"
                      :value="makeName(value)"
                      outlined
                      dense
                      disabled
                      readonly
                    />
                  </v-col>
                  <v-col
                    :cols="2"
                    class="py-0"
                  >
                    <v-text-field
                      label="Количество"
                      required
                      v-model="value.quantity"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    :cols="2"
                    class="py-0"
                  >
                    <v-text-field
                      label="Цена за еденицу"
                      required
                      v-model="value.price"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    :cols="2"
                    class="py-0"
                  >
                    <v-text-field
                      label="Цена закупки за еденицу"
                      required
                      v-model="value.original_price"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
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
  name: 'IncomePage',
  props: {
    data: {
      type: Array,
      default: null,
    },
    isModalActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('save', this.data);
    },
    makeName(value) {
      return `${value.brand.name} ${value.taste || value.resistance || value.color}`;
    },
  },
};
</script>

<style>
.v-text-field__details {
  display: none;
}
</style>
