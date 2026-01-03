function InitMathJaxRenderer() {
  MathJax.Hub.Register.StartupHook("End Jax", () => {
    return MathJax.Hub.setRenderer("HTML-CSS");
  });
}
