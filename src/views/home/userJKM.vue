<template>
  <div>
    <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange">
    <button @click="handleUploadClick">Upload</button>
    <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl">
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      file: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(this.file);
    },
    async handleUploadClick() {
      if (!this.file) {
        alert('Please select a file to upload');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        const response = await fetch('http://example.com/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          alert('File uploaded successfully');
        } else {
          throw new Error('File upload failed');
        }
      } catch (error) {
        console.error(error);
        alert('File upload failed');
      }
    },
  },
};
</script>
