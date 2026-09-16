import React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error Caught by Boundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A1D37] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900/90 border border-teal-500/30 rounded-3xl p-8 text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center border border-teal-500/30">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Chandrapura Kidney Care</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                A temporary display issue occurred while loading this view. Please refresh or return
                to the main hospital portal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
              >
                <RefreshCw className="w-4 h-4" /> Refresh Portal
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-4 rounded-xl border border-white/20 transition flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> Home Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
