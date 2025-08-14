import { useUserInputStore } from '../userStore/user.add.store';
import { useSignUp } from './useSignUp';
const SignUp = () => {
  const { name, email, password, setName, setEmail, setPassword } =
    useUserInputStore();
  const { signUp } = useSignUp();
  const prefillUser = () => {
    setName('Test User');
    setEmail('test@gmail.com');
    setPassword('Test1234');
  };

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className=' font-bold'>Register</h1>
          <form
            onSubmit={(e) => signUp(e)}
            action='OnSubmit'
            className='form-control w-full max-w-xs'
          >
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4'>
              <label className='label' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                required
                value={name}
                type='text'
                className='input validator'
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
              />

              <label className='label' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                required
                value={email}
                type='email'
                className='input validator'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className='label' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                value={password}
                type='password'
                className='input validator'
                required
                placeholder='Password'
                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                title='Must be more than 8 characters, including number, lowercase letter, uppercase letter'
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <div className='flex flex-row justify-between mx-4'>
              <button className='btn border-base-content' type='submit'>
                SignUp
              </button>
              <button className='btn border-base-content' onClick={prefillUser}>
                Prefill
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
