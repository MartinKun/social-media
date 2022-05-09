import classes from './SignUpForm.module.scss';

const SignUpForm = (props) => {

    const loginViewHandler = ()=>{
        props.onChangeFormView(true);
      }
    
  const submitHandler = (event) => {
    event.preventDefault();
    
  }


  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Nom</label>
          <input type='text' id='name' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='lastnam'>Prenom</label>
          <input type='text' id='lastname' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Mot de pas</label>
          <input type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>Create Account</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={loginViewHandler}
          >Login with existing account
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;