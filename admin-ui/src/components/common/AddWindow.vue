<template>
  <v-row justify="center">
    <v-dialog
      :value="isModalActive"
      width="600"
      @click:outside="close"
    >
      <v-card>
        <v-card-title>
          Додати {{ entity }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col :cols="12">
              <v-text-field
                :label="entity"
                required
                v-model="name"
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
  name: 'EditWindow',
  props: {
    entity: {
      type: String,
      default: '',
    },
    isModalActive: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    name: '',
    price: '',
    quantity: '',
  }),
  methods: {
    save() {
      this.$emit('save', {
        name: this.name,
      });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
