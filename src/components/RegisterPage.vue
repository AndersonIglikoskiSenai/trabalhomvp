<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-semibold mb-4">Registrar-se</h1>
    <form @submit.prevent="registerUser" class="flex flex-col gap-4">
      <input v-model="name" placeholder="Nome completo"
        class="border rounded p-2" required />

      <input v-model="email" type="email" placeholder="Email"
        class="border rounded p-2" required />

      <input v-model="phone" placeholder="Telefone (99) 99999-9999"
        class="border rounded p-2" required
        @input="formatPhone" maxlength="15" />

      <input v-model="address" placeholder="Endereço"
        class="border rounded p-2" />

      <textarea v-model="summary" placeholder="Resumo profissional"
        class="border rounded p-2"></textarea>

<!-- Experiências profissionais -->
<div>
  <label class="font-semibold">Experiências profissionais</label>
  <div v-for="(exp, idx) in experiences" :key="idx" class="flex gap-2 mb-2">
    <input v-model="experiences[idx]" placeholder="Experiência"
      class="border rounded p-2 flex-1" />
    <button type="button" @click="removeExperience(idx)" class="text-red-500 text-xl" title="Remover">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
        <path stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
      </svg>
    </button>
  </div>
  <button type="button" @click="addExperience" class="text-blue-600">Adicionar experiência</button>
</div>

<!-- Formação acadêmica -->
<div>
  <label class="font-semibold">Formação acadêmica</label>
  <div v-for="(edu, idx) in education" :key="idx" class="flex gap-2 mb-2">
    <input v-model="education[idx]" placeholder="Formação"
      class="border rounded p-2 flex-1" />
    <button type="button" @click="removeEducation(idx)" class="text-red-500 text-xl" title="Remover">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
        <path stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
      </svg>
    </button>
  </div>
  <button type="button" @click="addEducation" class="text-blue-600">Adicionar formação</button>
</div>

      <input v-model="skills" placeholder="Habilidades (separe por vírgula)"
        class="border rounded p-2" />

      <!-- Links -->
      <input v-model="linkedin" placeholder="LinkedIn"
        class="border rounded p-2" />
      <input v-model="github" placeholder="GitHub"
        class="border rounded p-2" />
      <input v-model="portfolio" placeholder="Portfólio"
        class="border rounded p-2" />

      <input v-model="password" type="password" placeholder="Senha"
        class="border rounded p-2" required />

      <button type="submit"
        class="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Registrar</button>
    </form>
    <!-- Removido: Exportação (compartilhar, email, PDF) -->
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";

export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
      experiences: [""],
      education: [""],
      skills: "",
      linkedin: "",
      github: "",
      portfolio: "",
      password: "",
    };
  },
  methods: {
    formatPhone() {
      // Máscara simples para telefone brasileiro
      let v = this.phone.replace(/\D/g, "");
      v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
      v = v.replace(/(\d{5})(\d)/, "$1-$2");
      this.phone = v.slice(0, 15);
    },
    addExperience() {
      this.experiences.push("");
    },
    removeExperience(idx) {
      this.experiences.splice(idx, 1);
    },
    addEducation() {
      this.education.push("");
    },
    removeEducation(idx) {
      this.education.splice(idx, 1);
    },
    async registerUser() {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", {
          name: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          summary: this.summary,
          experiences: this.experiences,
          education: this.education,
          skills: this.skills,
          linkedin: this.linkedin,
          github: this.github,
          portfolio: this.portfolio,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/profile");
      } catch (error) {
        alert("Erro ao registrar usuário.");
      }
    },
  },
};
</script>