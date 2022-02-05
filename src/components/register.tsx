export default function Register({}: Props) {
  return <div>register</div>;
}

type Props = {
  setError: (error: string | undefined) => void;
  setFormState: (state: 'login') => void;
};
