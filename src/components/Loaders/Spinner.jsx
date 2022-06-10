import "./spinner.css";

export default function Spinner() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="loader mb-2 
      border-t-8 dark:border-t-white  border-t-primary
      border-b-8 dark:border-b-white/25 border-b-primary/25 
      border-l-8 dark:border-l-white/25 border-l-primary/25 
      border-r-8 dark:border-r-white/25 border-r-primary/25
      w-10 h-10
      "
      ></div>
      <p className="text-primary dark:text-secondary-text">Please wait...</p>
    </div>
  );
}
