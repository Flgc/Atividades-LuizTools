const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const users = [{
   _id: 1,
   username: 'adm',
   password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW',
   email: 'contato@flgc.com.br'
}]

module.exports = function(passport){
   
   //chamada no banco de dados ou em memória
   //Procura por nome (em memória)
   function findUser(username){
      return uers.find(item => item.username === username);
   }
   
   //Procura por id (em memória)
   function findUserById(id){
      return users.find(item => item._id === id);
   }

   //configura o passport (regras de cookers e sessao)
   passport.serializeUser((user, done) => {
      done(null, user._id);
   })

   passport.deserializeUser((id, done) => {
      try {
         const user = findUserById(id);
         done(null, user);
      } catch (err) {
         console.log(err);
         return done(err, null);         
      }
   })  
   
   /*
      configura a estrategia LOCAL de quais serão 
      os campos a ser utilizados para autenticacao
    */

    passport.use(new LocalStrategy({
       usernameField: 'username',
       passwordField: 'passWord'
    },
    (username, password, done) => {
       try {
          const user = findUser(username);
          if(!user) return done(null, false);

          const isValid = bcrypt.compareSync(password, user.password)
          if(!isValid) return done(null, false);
          return done(null, user);          
       } 
       catch (err) {
          console.log(err);
          return done(err, false);
       }
    }))
}