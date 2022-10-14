import { Component } from "react";
import { AiFillWarning } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  render() {
    if (this.state.errorInfo) {
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
            <details style={{ whiteSpace: "pre-wrap" }}>
              <summary>Need More Details</summary>
              {this.state.error && this.state.error.toString()}
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
