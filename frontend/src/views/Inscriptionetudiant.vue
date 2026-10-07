<template>
   <div class="inscription">
    <div class="inscription-menue">
        <div class="inscription-titre">
            <h1>Gestions Des Examens</h1>
            <p>Université de Fianarantsoa</p>
        </div>
        <div class="inscription">
            <h2>Inscription Etudiant</h2>
            <p>créer votre compte etudiant
                pour accèder a vos services  en ligne
            </p>
        </div>
        <div class="inscription-footer">
            <p>Votre parcours commence ici!</p>
        </div>
    </div>

    <div class="Inscription-form">
        
            <form action="">
                <div class="form">
            <h3>1-Information Personnel</h3>
                <label for="nom">Nom*</label>
                <input type="text" id="nom" placeholder="Votre nom" required>
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" placeholder="Votre prénom" >
            </div>

            <div class="form">
                <label for="email">E-mail*</label>
                <input type="email" id="email" placeholder="exemple@gmail.com" required>
                <label for="tel">Matricule</label>
                <input type="text" id="matricule" placeholder="Votre matricule">
            </div>

            <div class="form">
                <label for="datenais">Date de naissance</label>
                <input type="date"  id="datenaiss" placeholder="jj/mm/aaaa">
                <label for="parcours">Parcours</label>
                <select >
                    <option value="">selectionner votre parcours</option>
                    <option value=""></option>
                </select>
            </div>

            <div class="form">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" placeholder="Au moins 8 caractères" required>
                <label for="passwordConfirm">Confirmation de Mot de passe</label>
                <input type="password" id="passwordConfirm" placeholder="Répeter votre mot de passe" required>
        
                </div>
                <div class="form">
                    <button>Suivant</button>
                </div>
                <div class="form">
<p>Déja un compte? <RouterLink to="/loginEtudiant">Se connecter</RouterLink></p>
                </div>
                <div class="form">
                    <RouterLink to="/home">retour</RouterLink>
                </div>

                
            </form>

        
    </div>
   </div>
</template>