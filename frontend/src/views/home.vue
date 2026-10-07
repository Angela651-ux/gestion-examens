<template>
  <div class="accueil">

    <div class="contenue">
      
      <div class="login-titre">
        <div class="logo">
        <h1>Gestions des examens</h1>
        <p>Université de Fianarantsoa</p>
        </div>
        <div class="titre">
          <h2>Bienvenue</h2>
          <p>Connectez-Vous à votre espace pour 
            acceder à vos et gérér vos examens .</p>
        </div>
      </div>

      <div class="acceuill-vue">
        <h3>Quel type d' utilisateurs etes -vous?</h3>
        <p> selectionner votre profil pour contunier</p>

        <div class="bouton">
        <div class="etudiant">
          <h4>Etudiant</h4>
          <p>Consulter vos notes, convocation 
            et votre calendrier d' examens.
          </p>
          <RouterLink to="/loginEtudiant">
          <button>Choisir</button>
          </RouterLink>
        </div>
        <div class="personnel">
          <h4>personnel</h4>
          <p>Enseignant , secretaire ,
            Chef de mentions , Administrateur.
          </p>
         <RouterLink to="/loginPersonnel">
          <button>Choisir</button>
          </RouterLink>
        </div>
        </div>

        <div class="image">
          <p>Ensemble pour une Gestions
            plus efficace des examens !
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

