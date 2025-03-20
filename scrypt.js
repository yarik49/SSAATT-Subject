document.addEventListener("DOMContentLoaded", function() {
    let curentUser=0;
  
    const navHome = document.getElementById("nav-home");
    const navRegister = document.getElementById("nav-register");
    const navBlog = document.getElementById("nav-blog");
    const navNewEntry = document.getElementById("nav-new-entry");
    const navAbout = document.getElementById("nav-about");
  
    const sectionHome = document.getElementById("home-section");
    const sectionRegister = document.getElementById("register-section");
    const sectionBlog = document.getElementById("blog-section");
    const sectionNewEntry = document.getElementById("new-entry-section");
    const sectionAbout = document.getElementById("about-section");
  
    const homeForm = document.getElementById("home-form");
    const registerForm = document.getElementById("register-form");
    const newEntryForm = document.getElementById("new-entry-form");
    const loadPost = document.getElementById("load-post");
    if(loadPost)
    {
      loadPost.addEventListener("click", handleLoad);
    }

    homeForm.addEventListener("submit", handleLogin);
    registerForm.addEventListener("submit", handleRegister);
    newEntryForm.addEventListener("submit", handleNewEntry);
  



    function handleLogin(event) {
      event.preventDefault();
      const form = event.target;
      const username = form.username.value.trim();
      const password = form.password.value.trim();
  
      document.getElementById("home-error").textContent = "";
  
      console.log(JSON.stringify({user:username, password}));
      fetch('http://labtelema.ujaen.es:8083/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // Specify that the request body is JSON
      },
      body: JSON.stringify({user:username, password})
      }).then(response=>{
        if(response.ok){
          curentUser = username;
        alert("Login succesful!!!");
        console.log("Succesfulll login!", response.status);
        navHome.style.display = "none";
        navRegister.style.display = "none";
  
        navBlog.style.display = "block";
        navNewEntry.style.display = "block";
  
        showSection("blog");
        }
        else{
          document.getElementById("home-error").textContent = "Invalid credentials!";
          console.error("Invalid credentials!", response.status);
        }
      })
      
    }

function curname(curentUser)
{
  currentUser = username;
  return curentUser;
}

  
    function handleRegister(event) {
      event.preventDefault();
      
      const form = event.target;
      const username = form.username.value.trim();
      const name = form.name.value.trim();
      const surname = form.surname.value.trim();
      const email = form.email.value.trim();
      const password = form['password'].value.trim(); 
      const check_password = form['check-password'].value.trim();
      
      document.getElementById("register-error").textContent = "";
  
      if (password !== check_password) {
        document.getElementById("register-error").textContent = "Different passwords!";
        return; // oprește execuția dacă parolele nu corespund
      }
  
      console.log(JSON.stringify({user: username, password, name, surname, email}));
      
      fetch('http://labtelema.ujaen.es:8083/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'  // Specify that the request body is JSON
      },
        body: JSON.stringify({user:username, password, name, surname, email })
      })
        .then(response => {
          
          if (response.ok ) {
            currentUser = username;
            alert("Registration succesfull!!!");
            console.log("Registration succesfull!!!", response.status);
          } 
          else {
            alert("Registration failed");
            console.error("Registration failed!!!", response.status);
          }
        })
        
        
    } 


    function handleNewEntry(event){

      event.preventDefault();
      const form = event.target;
      const username = document.getElementById("username").value;
      const title = form.title.value.trim();
      const date = form.date.value.trim();
      const comment = form.comment.value.trim();

      document.getElementById("new-entry-error").textContent = "";
      if(comment === ""){
        document.getElementById("new-entry-error").textContent = "Section comment is empty!";
      }
      
      console.log(JSON.stringify({user: username, title, date, comment}));
      fetch('http://labtelema.ujaen.es:8083/blog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'  // Specify that the request body is JSON
      },
      body: JSON.stringify({user:username, title, date, comment})
      }).then(response=>{
        if(response.ok){
          alert("Post was published succesfull!!!");
          console.log("Succesfull publish!!!", response.status);
        }
        else{
          console.error("Error to publish!!!", response.status);
        }

        sectionNewEntry.style.display = "block";
      })
      
    }

    function handleLoad(event){
      event.preventDefault();
      const user = document.getElementById("username").value;
      
      const title = document.getElementById("title").value;
      const date = document.getElementById("date").value;
      const comment = document.getElementById("comment").value;

      document.getElementById("blog-error").textContent = "";

      
      
      fetch(` http://labtelema.ujaen.es:8083/blog/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'  
      },
      /*body: JSON.stringify({_id, user, title, date, comment})*/
      }).then(response=>{
        if(response.ok){
          response.json().then(data=>console.log(data))
          currentUser=user;
          console.log(`Its post of user ${user} `, response.status );
        }
        else{
          console.error("Error to show", response.status);
        }
      })
    }



  
    // Evenimentele de navigare:
    navHome.addEventListener("click", (e) => {    
      e.preventDefault();
      showSection("home");
    });
    navRegister.addEventListener("click", (e) => {    
      e.preventDefault();
      showSection("register");
    });
    navBlog.addEventListener("click", (e) => {    
      e.preventDefault();
      showSection("blog");
    });
    navNewEntry.addEventListener("click", (e) => {    
      e.preventDefault();
      showSection("new-entry");
    });
    navAbout.addEventListener("click", (e) => {    
      e.preventDefault();
      showSection("about");
    });
  
    // Setăm secțiunea inițială și ascundem elementele pentru blog și new-entry
    showSection("home");
    navBlog.style.display = "none";
    navNewEntry.style.display = "none";
  
    function showSection(sectionName) {
      sectionHome.style.display = "none";
      sectionRegister.style.display = "none";
      sectionBlog.style.display = "none";
      sectionNewEntry.style.display = "none";
      sectionAbout.style.display = "none";
  
      switch (sectionName) {
        case "home":
          sectionHome.style.display = "block";
          break;
        case "register":
          sectionRegister.style.display = "block";
          break;
        case "blog":
          sectionBlog.style.display = "block";
          break;
        case "new-entry":
          sectionNewEntry.style.display = "block";
          break;
        case "about":
          sectionAbout.style.display = "block";
          break;
      }
    }
  });
  