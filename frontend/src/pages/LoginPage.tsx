import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center flex-col justify-center">
      <div className="w-full max-w-2xl  p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
