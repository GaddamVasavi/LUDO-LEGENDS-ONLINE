export class WebGLShaderPipeline {
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext);
    if (this.gl) {
      this.initShaders();
    }
  }

  private initShaders(): void {
    if (!this.gl) return;
    const gl = this.gl;

    const vsSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 uResolution;
      uniform float uTime;
      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        float color = sin(st.x * 10.0 + uTime) * cos(st.y * 10.0 + uTime);
        gl_FragColor = vec4(vec3(color * 0.15 + 0.1, 0.1, 0.25), 1.0);
      }
    `;

    const vs = this.compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, fsSource);

    if (vs && fs) {
      this.program = gl.createProgram();
      if (this.program) {
        gl.attachShader(this.program, vs);
        gl.attachShader(this.program, fs);
        gl.linkProgram(this.program);
      }
    }
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;
    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }

  public render(timeSeconds: number): void {
    if (!this.gl || !this.program) return;
    const gl = this.gl;

    gl.useProgram(this.program);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const uRes = gl.getUniformLocation(this.program, 'uResolution');
    const uTime = gl.getUniformLocation(this.program, 'uTime');

    gl.uniform2f(uRes, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(uTime, timeSeconds);
  }
}
