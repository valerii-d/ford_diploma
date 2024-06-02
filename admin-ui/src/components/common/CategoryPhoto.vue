<template>
  <v-row justify="center">
    <v-dialog
      :value="isModalActive"
      width="600"
      @click:outside="close"
    >
      <v-card>
        <v-card-title>
          Редактирование картинок
        </v-card-title>
        <v-card-text>
          <v-row jusify="center">
            <v-col :cols="9">
              <v-file-input
                counter
                show-size
                small-chips
                label="Фото"
                accept="image/*"
                v-model="photoToAdd"
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
  name: 'CategoryPhoto',
  props: {
    categoryId: {
      type: Number,
      default: null,
    },
    isModalActive: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    photoToAdd: [],
  }),
  mounted() {
    this.photoToAdd = [];
  },
  methods: {
    async save() {
      const formData = new FormData();
      /* eslint-disable */
      if (this.photoToAdd) {
        formData.append('files', this.photoToAdd, this.photoToAdd.name);
      }
      formData.append('id', this.categoryId);

      this.$emit('addPhotos', formData);
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
