
<template>
  <div class="containerEC">

    <!-- En-tête -->
    <div class="titre-page">
      <div>
        <h1>Gestion des EC</h1>
        <p>Créer, consulter, modifier et supprimer les éléments constitutifs.</p>
      </div>

      <button class="btn-primary" @click="OuvrirFormulaire">
        + Nouvel EC
      </button>
    </div>

    <!-- Fenêtre d'ajout EC -->
    <div v-if="formulaireVisible" class="overlay">
      <div class="formulaire">

        <h2>Nouvel élément constitutif</h2>

        <form @submit.prevent="EnregistreEC">

          <label>Numéro EC</label>
          <input v-model="numEC" readonly>

          <label>Intitulé</label>
          <input  v-model="libeleEC" type="text" placeholder="Nom de l'EC" required>
           <p v-if="erreurLib" class="erreur">{{ erreurLib }}</p>

          <label>Crédits</label>
          <input  v-model="creditEC" type="number" placeholder="Ex : 2" required>
           <p v-if="erreurCredit" class="erreur">{{ erreurCredit}}</p>

           <label> Enseignant</label>
         <select v-model="enseignantEC" required>
  <option value="" disabled>Choisir un enseignant</option>

  <option
    v-for="ens in enseignant"
    :key="ens.idenseignant"
    :value="ens.idenseignant"
  >
    {{ ens.nomutilisateur }} {{ ens.prenomutilisateur }}
  </option>
</select>
           <p v-if="erreurEnseignant" class="erreur">{{ erreurEnseignant }}</p>

          <label>UE associée</label>
          <select v-model="UeEC" required>
            <option value="" disabled>Choisir une UE</option>
            <option  v-for= "u in ues" :key="u.idue" :value="u.idue">{{u.libeleue}}</option>

          </select>
           <p v-if="erreurUe" class="erreur">{{ erreurUe }}</p>

          <div class="boutons">
            <button
              type="button"
              class="btn-secondary"
              @click="formulaireVisible = false"
            >
              Annuler
            </button>

            <button type="submit" class="btn-primary">
              Enregistrer
            </button>
          </div>

        </form>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="contenu-EC">

      <!-- Liste des EC -->
      <section class="affichageEC">

        <h2>Liste des EC</h2>

        <div class="search-box">
          <input
            type="text"
            placeholder="Rechercher un EC..."
            v-model="rechercherEC"
          >
        </div>

        <div class="tableau">
          <table>
            <thead>
              <tr>
                <th>Numéro EC</th>
                <th>Intitulé</th>
                <th>Crédits</th>
                <th>UE associer</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for= "ec in listeECFiltre" :key="ec.idec">
              <td>{{ec.numec}}</td>
              <td>{{ec.nomec}}</td>
              <td>{{ec.credit}}</td>
              <td>{{ec.ue?.libeleue}}</td>
          <td><button @click="selectionnerEC(ec)">✏️</button></td>
              <td><button @click="supprimerEC(ec)">🗑️</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

      <!-- Détails EC -->
      <section class="detailsEC">

        <div class="formulaireEC">

          <h2>Détails de l'EC</h2>

          <div class="champsEC">

            <label>
              Numéro EC
              <input v-model="detailleEC.numEC" type="text" readonly >
            </label>

            <label>
              Intitulé
              <input  v-model="detailleEC.libeleEC" type="text" >
            </label>

            <label>
              Crédits
              <input  v-model="detailleEC.creditEC" type="number" >
            </label>

            <label>
              Enseignant
              <select v-model="detailleEC.enseignantEC">
                <option value="">Choisir un enseignant</option>
                <option v-for= "e in enseignant" :key:="e.idenseignant" :value="e.idenseignant">{{e.nomutilisateur}} {{e.prenomutilisateur}}</option>
              </select>
            </label>

            <label>
              UE associée
              <select v-model= "detailleEC.UeEC">
                <option value="">Choisir une UE</option>
                 <option v-for= "u in ues" :key:="u.idue" :value="u.idue">{{u.libeleue}}</option>
              </select>
            </label>

          </div>

          <div class="boutons">
            <button @click="modifierEc" type="button" class="btn-primary">
              Modifier
            </button>


            <button @click="supprimerEC(detailleEC.idec)" type="button" class="btn-delete">
              Supprimer
            </button>
          </div>

        </div>

      </section>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'


const formulaireVisible = ref(false)

function OuvrirFormulaire() {
  formulaireVisible.value = true
}

const numEC = ref('')
const libeleEC = ref('')
const creditEC = ref('')
const enseignantEC = ref('')
const UeEC = ref('')

const erreurLib = ref('')
const erreurCredit = ref('')
const erreurEnseignant = ref('')
const erreurUe = ref('')

const enseignant = ref([])
const ues = ref([])
const listeEC= ref([])
const EcSelectionner= ref([])

const detailleEC = ref({
  idec: null,
  numEC:'',
  libeleEC:'',
  creditEC:'',
  enseignantEC:'',
  UeEC:''

})

const rechercherEC= ref('')

const route = useRoute()

onMounted(async () => {
  try {
    const reponseEnseignant = await axios.get(
      'http://localhost:3000/svrpers-enseignant/enseignant'
    )

    enseignant.value = reponseEnseignant.data

    console.log('Enseignants chargés :', enseignant.value)
    console.log('Premier enseignant :', enseignant.value[0])

    const reponseUe = await axios.get(
      'http://localhost:3000/svrpedag-ec/listeUe'
    )

    ues.value = reponseUe.data

    console.log('Ue charger:', ues.value)

  } catch (erreur) {
    console.error('Erreur de chargement :', erreur)
  }
})

const ChargerProchainCodeEC = async() => {
   try {
    const reponseCodeEc = await axios.get(
      'http://localhost:3000/svrpedag-ec/prochainCodeEC'
    )

    numEC.value = reponseCodeEc.data.numec
   }catch(erreur){
    console.error('Erreur de chargement:' , erreur)
   }
}
onMounted(() =>{
  ChargerProchainCodeEC()

  chargerEC()
})

const EnregistreEC= async() => {
  erreurLib.value= ''
  erreurCredit.value= ''
  erreurEnseignant.value = ''
  erreurUe.value= ''
  if(!libeleEC.value.trim()){
    erreurLib.value = 'Veillez renseigner ce champs'
    return
  }
  if(!creditEC.value){
    erreurCredit.value = 'Veillez renseigner ce champs'
    return
  }
  if(!enseignantEC.value){
    erreurEnseignant.value= 'Veillez sélectionner un enseignant'
    return
  }
  if(!UeEC.value){
    erreurUe.value= 'Veillez sélectionner un UE'
    return
  }

  try{
    const UE = await axios.post(
      'http://localhost:3000/svrpedag-ec/enregistrerEC',{
        numec: numEC.value,
        nomec: libeleEC.value,
        credit: creditEC.value,
        idenseignant: enseignantEC.value,
        idue: UeEC.value
      }
    )
    console.log(UE.data)
      alert('Ec ajoutée avec succès!')

      libeleEC.value='',
      creditEC.value='',
      enseignantEC.value= ''
      UeEC.value= ''

      await ChargerProchainCodeEC()

      await chargerEC()
  }catch(erreur){
console.error('Echec de l\'ajout:', erreur)
  }

}

function selectionnerEC(ec){
  console.log('Ec recue:',JSON.stringify(ec, null,2))

  EcSelectionner.value = ec

  detailleEC.value ={
    idec:ec.idec,
    numEC: ec.numec ?? '',
    libeleEC: ec.nomec ?? '',
    creditEC: ec.credit ?? '',
    enseignantEC: ec.idenseignant ?? '',
    UeEC: ec.ue?.idue ?? '',

  }

   console.log('ID sélectionné :', detailleEC.value.idec);
}

async function chargerEC() {
  try {
    const reponseListeEC = await axios.get(
      'http://localhost:3000/svrpedag-ec/ListeEC'
    )

    listeEC.value = reponseListeEC.data

    if (listeEC.value.length === 0) {
      detailleEC.value = {
        idec: null,
        numEC: '',
        libeleEC: '',
        creditEC: '',
        enseignantEC: '',
        UeEC: ''
      }
      return
    }

    const idEC = route.query.idec

    if (idEC) {
      
      const ecTrouve = listeEC.value.find(
        ec => String(ec.idec) === String(idEC)
      )

      if (ecTrouve) {
        selectionnerEC(ecTrouve)
      } else {
        alert('EC introuvable')
      }

    } else {
      // Sélectionner le dernier EC si aucun identifiant n'est transmis
      const dernierEC = [...listeEC.value].sort(
        (a, b) => b.idec - a.idec
      )[0]

      selectionnerEC(dernierEC)
    }

  } catch (erreur) {
    console.error('Erreur de chargement:', erreur)
  }
}

const modifierEc = async () => {
  
  try{
    const id = EcSelectionner.value.idec

    const donnee ={
      numec: detailleEC.value.numEC,
      nomec: detailleEC.value.libeleEC,
      credit: detailleEC.value.creditEC,
      idenseignant: detailleEC.value.enseignantEC,
      idue: detailleEC.value.UeEC
    }

    await axios.put(
      `http://localhost:3000/svrpedag-ec/modifierEC/${id}`, donnee
    )

    alert('Modification enregistré avec succès !')

    await chargerEC()
  } catch(erreur){
    console.error('Erreur de modification:', erreur)
    alert('Erreur de modification !')
  }
}

const supprimerEC = async () => {

const ec = EcSelectionner.value

 const confirmation = confirm(`Voulez-vous vraiment supprimer l' EC ${ec.numec} ?`)

 if(!confirmation){
  return
 }
 

 try{
  await axios.delete(
    `http://localhost:3000/svrpedag-ec/supprimerEC/${ec.idec}`
  )
  alert('EC supprimé avec succèes')
  await chargerEC()

  await ChargerProchainCodeEC()
 }catch(erreur){
  console.error('Erreur de suppression:', erreur)
  alert('Erreur de suppression')
 }
}

function ECFiltres() {
  if (rechercherEC.value.trim() === '') {
    return listeEC.value;
  }

  return listeEC.value.filter(ec => {
    return (
      ec.numec?.toLowerCase().includes(rechercherEC.value.toLowerCase()) ||
      ec.nomec?.toLowerCase().includes(rechercherEC.value.toLowerCase())
    );
  });
}


const listeECFiltre = computed(() => {
  const idEC = route.query.idec

  // Si un EC est transmis, afficher uniquement cet EC
  if (idEC) {
    return listeEC.value.filter(
      ec => String(ec.idec) === String(idEC)
    )
  }

  // Sinon, afficher tous les EC
  return listeEC.value
})
</script>


<style scoped>

.containerEC {
  padding: 24px;
  background: #f5f8fc;
  min-height: 100%;
  color: #243b5a;
  box-sizing: border-box;
}

/* En-tête */
.titre-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.titre-page h1 {
  margin: 0 0 8px;
  font-size: 26px;
}

.titre-page p {
  margin: 0;
  color: #718096;
}

/* Organisation principale */
.contenu-EC {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 16px;
  align-items: start;
}

/* Cartes */
.affichageEC,
.detailsEC {
  min-width: 0;
  background: white;
  border: 1px solid #dce6f3;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
}

.affichageEC h2,
.detailsEC h2 {
  margin: 0 0 16px;
  font-size: 18px;
}

/* Recherche */
.search-box {
  margin-bottom: 16px;
}

.search-box input {
  width: 100%;
  padding: 11px;
  border: 1px solid #d5e0ef;
  border-radius: 6px;
  box-sizing: border-box;
}

/* Tableau */
.tableau {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e0e8f2;
  border-radius: 6px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 12px 10px;
  border-bottom: 1px solid #e7edf5;
  font-size: 13px;
  white-space: nowrap;
}

th {
  background: #f0f5fb;
  color: #304969;
}

tbody tr:hover {
  background: #f5f9ff;
}

/* Formulaire détails */
.formulaireEC {
  padding: 14px;
  border: 1px solid #dce6f3;
  border-radius: 7px;
}

.champsEC {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
}

input,
select {
  width: 100%;
  min-width: 0;
  padding: 10px;
  border: 1px solid #d5e0ef;
  border-radius: 5px;
  box-sizing: border-box;
  background: white;
}

/* Boutons */
.boutons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background: #1877f2;
  color: white;
}

.btn-primary:hover {
  background: #1263ce;
}

.btn-secondary {
  background: #edf1f6;
  color: #344760;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

/* Fenêtre modale */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 1000;
}

.formulaire {
  background: white;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 8px 30px #00000025;
  box-sizing: border-box;
}

.formulaire h2 {
  color: #17365d;
  margin-top: 0;
  margin-bottom: 20px;
}

.formulaire form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* Responsive */
@media (max-width: 900px) {
  .contenu-EC {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .containerEC {
    padding: 12px;
  }

  .titre-page {
    align-items: flex-start;
    flex-direction: column;
  }

  .champsEC,
  .formulaire form {
    grid-template-columns: 1fr;
  }
}

</style>
