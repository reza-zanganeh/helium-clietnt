/** @format */
import { ref } from "vue";
export default function(context) {
  const previewImage = ref(null);
  const fileInput = ref(null);
  function selectImage() {
    fileInput.value.click();
  }
  function pickFile() {
    let input = fileInput.value;
    let file = input.files;
    if (file && file[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        previewImage.value = e.target.result;
      };
      reader.readAsDataURL(file[0]);
      context.emit("inputImage", file[0]);
    }
  }
  return {
    previewImage,
    fileInput,
    selectImage,
    pickFile,
  };
}
