import { Component } from "react";
import { AiFillWarning } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-[100vw-265px] h-full mx-5 my-2">
          <div className="w-full h-full flex flex-col justify-center items-center ">
            <IconContext.Provider
              value={{
                className: `text-gray-500 dark:text-secondary-text`,
              }}
            >
              <AiFillWarning size={70} />
            </IconContext.Provider>
            <span className="text-xl dark:text-secondary-text">Oops</span>
            <h1 className="font-bold text-xl dark:text-secondary-text">
              Something went wrong.
            </h1>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
