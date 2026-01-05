import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="w-full h-screen flex items-center flex-col justify-center">
      <div className="w-full max-w-2xl  p-4">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
