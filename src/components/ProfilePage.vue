<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-50">
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
      <h1 class="text-3xl font-bold mb-6 text-blue-700 text-center">Perfil do Usuário</h1>
      <div v-if="user.email" class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center md:gap-2">
          <span class="font-semibold text-blue-800 w-40">Nome:</span>
          <span class="text-gray-700">{{ user.name }}</span>
        </div>
        <div class="flex flex-col md:flex-row md:items-center md:gap-2">
          <span class="font-semibold text-blue-800 w-40">Email:</span>
          <span class="text-gray-700">{{ user.email }}</span>
        </div>
        <div class="flex flex-col md:flex-row md:items-center md:gap-2">
          <span class="font-semibold text-blue-800 w-40">Telefone:</span>
          <span class="text-gray-700">{{ user.phone }}</span>
        </div>
        <div class="flex flex-col md:flex-row md:items-center md:gap-2">
          <span class="font-semibold text-blue-800 w-40">Endereço:</span>
          <span class="text-gray-700">{{ user.address }}</span>
        </div>
        <div>
          <span class="font-semibold text-blue-800">Resumo profissional:</span>
          <p class="text-gray-700 mt-1">{{ user.summary }}</p>
        </div>
        <div>
          <span class="font-semibold text-blue-800">Experiências profissionais:</span>
          <ul class="list-disc list-inside text-gray-700 mt-1">
            <li v-for="(exp, idx) in user.experiences" :key="idx">{{ exp }}</li>
          </ul>
        </div>
        <div>
          <span class="font-semibold text-blue-800">Formação acadêmica:</span>
          <ul class="list-disc list-inside text-gray-700 mt-1">
            <li v-for="(edu, idx) in user.education" :key="idx">{{ edu }}</li>
          </ul>
        </div>
        <div>
          <span class="font-semibold text-blue-800">Habilidades:</span>
          <span class="text-gray-700">{{ user.skills }}</span>
        </div>
        <div>
          <span class="font-semibold text-blue-800">Links:</span>
          <ul class="list-disc list-inside text-blue-600 mt-1">
            <li v-if="user.linkedin"><a :href="user.linkedin" target="_blank" class="underline">LinkedIn</a></li>
            <li v-if="user.github"><a :href="user.github" target="_blank" class="underline">GitHub</a></li>
            <li v-if="user.portfolio"><a :href="user.portfolio" target="_blank" class="underline">Portfólio</a></li>
          </ul>
        </div>
        <!-- Exportação - ainda tenho que mudar o tamanho de botão e por icone.-->
        <div class="flex flex-col gap-2 mt-8">
          <button @click="shareSocial" class="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Compartilhar no facebook
          </button>
          <button @click="sendEmail" class="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition">
            Enviar por email
          </button>
          <button @click="generatePDF" class="bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition">
            Gerar em PDF
          </button>
        </div>
      </div>
      <div v-else class="text-center text-blue-700 mt-8">
        <p>Carregando...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";

export default {
  data() {
    return {
      user: {},
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = response.data;
    } catch (error) {
      alert("Você precisa estar logado para acessar o perfil.");
      this.$router.push("/login");
    }
  },
  methods: {
    shareSocial() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent("Veja meu currículo!");
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, "_blank");
    },
    sendEmail() {
      const subject = encodeURIComponent("Meu Currículo");
      const body = encodeURIComponent("Segue meu currículo gerado pelo sistema.");
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
    generatePDF() {
      const doc = new jsPDF();
      let y = 10;
      doc.setFontSize(16);
      doc.text(`Currículo de ${this.user.name}`, 10, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(`Email: ${this.user.email}`, 10, y);
      y += 8;
      doc.text(`Telefone: ${this.user.phone}`, 10, y);
      y += 8;
      doc.text(`Endereço: ${this.user.address}`, 10, y);
      y += 8;
      doc.text("Resumo profissional:", 10, y);
      y += 6;
      doc.setFontSize(10);
      doc.text(this.user.summary || '-', 12, y, {maxWidth: 180});
      y += 12;
      doc.setFontSize(12);
      doc.text("Experiências profissionais:", 10, y);
      y += 6;
      doc.setFontSize(10);
      (this.user.experiences || []).forEach(exp => {
        doc.text(`- ${exp}`, 12, y, {maxWidth: 180});
        y += 6;
      });
      y += 2;
      doc.setFontSize(12);
      doc.text("Formação acadêmica:", 10, y);
      y += 6;
      doc.setFontSize(10);
      (this.user.education || []).forEach(edu => {
        doc.text(`- ${edu}`, 12, y, {maxWidth: 180});
        y += 6;
      });
      y += 2;
      doc.setFontSize(12);
      doc.text("Habilidades:", 10, y);
      y += 6;
      doc.setFontSize(10);
      doc.text(this.user.skills || '-', 12, y, {maxWidth: 180});
      y += 10;
      doc.setFontSize(12);
      doc.text("Links:", 10, y);
      y += 6;
      doc.setFontSize(10);
      if (this.user.linkedin) { doc.text(`LinkedIn: ${this.user.linkedin}`, 12, y, {maxWidth: 180}); y += 6; }
      if (this.user.github) { doc.text(`GitHub: ${this.user.github}`, 12, y, {maxWidth: 180}); y += 6; }
      if (this.user.portfolio) { doc.text(`Portfólio: ${this.user.portfolio}`, 12, y, {maxWidth: 180}); y += 6; }
      doc.save("curriculo.pdf");
    },
  },
};
</script>