<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-blue-50">
    <div class="bg-white rounded-lg shadow p-8 max-w-lg w-full">
      <h1 class="text-3xl font-bold mb-4 text-blue-700">Sobre nós</h1>
      <p class="mb-6 text-gray-700">
        O objetivo desse site é um trabalho onde o usuário possa cadastrar curriculos. Gerenciar seu perfil e exportar seus documentos. 
        Além de compartilhar nas redes sociais.
      </p>
      <form @submit.prevent="sendMessage" class="flex flex-col gap-4">
        <label class="font-semibold text-gray-600">Envie sua mensagem:</label>
        <textarea v-model="message" placeholder="Escreva sua mensagem"
          class="border rounded p-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
        <button type="submit"
          class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">Enviar</button>
      </form>
    </div>
  </div>
</template> 

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async sendMessage() {
      if (!this.message.trim()) {
        alert("Digite uma mensagem");
        return;
      }
      try {
        await axios.post("http://localhost:5000/api/messages", { message: this.message });
        this.message = "";
        alert("Mensagem enviada com sucesso!");
      } catch (error) {
        alert("Erro ao enviar mensagem.");
      }
    },
  },
};
</script>