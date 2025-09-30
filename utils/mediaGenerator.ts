// Media Asset Generator for W9 Studios
// Generates placeholder videos and images for the portfolio

export class MediaGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(width: number = 1920, height: number = 1080) {
    // Create canvas for server-side or client-side rendering
    if (typeof document !== 'undefined') {
      this.canvas = document.createElement('canvas');
    } else {
      // For server-side, we'll use a placeholder
      this.canvas = {} as HTMLCanvasElement;
    }

    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  // Generate branded thumbnail with gradient and text
  generateThumbnail(
    title: string,
    client: string,
    colors: { primary: string; secondary: string }
  ): string {
    const { ctx, canvas } = this;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(1, colors.secondary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add dark overlay for text readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add W9 Studios branding
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('W9 STUDIOS', 60, 60);

    // Add project title
    ctx.font = 'bold 72px Inter, sans-serif';
    ctx.fillText(title, 60, canvas.height / 2);

    // Add client name
    ctx.font = '36px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(client, 60, canvas.height / 2 + 80);

    // Add decorative elements
    this.addGeometricElements();

    return canvas.toDataURL('image/jpeg', 0.9);
  }

  // Add geometric elements for visual interest
  private addGeometricElements() {
    const { ctx, canvas } = this;

    // Add random circles with low opacity
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 100 + 50;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Add diagonal lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = -canvas.height; i < canvas.width; i += 100) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + canvas.height, canvas.height);
      ctx.stroke();
    }
  }

  // Generate a frame for video animation
  generateVideoFrame(
    frameNumber: number,
    totalFrames: number,
    text: string = 'W9 STUDIOS'
  ): ImageData {
    const { ctx, canvas } = this;

    // Clear canvas
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Animated gradient background
    const phase = (frameNumber / totalFrames) * Math.PI * 2;
    const gradient = ctx.createRadialGradient(
      canvas.width / 2 + Math.sin(phase) * 200,
      canvas.height / 2 + Math.cos(phase) * 100,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );

    gradient.addColorStop(0, '#0066FF');
    gradient.addColorStop(0.5, '#1A1A1A');
    gradient.addColorStop(1, '#E84141');

    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    // Animated particles
    this.drawAnimatedParticles(frameNumber, totalFrames);

    // Main text with glow effect
    ctx.shadowColor = '#0066FF';
    ctx.shadowBlur = 20 + Math.sin(phase) * 10;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Subtitle
    ctx.shadowBlur = 0;
    ctx.font = '36px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('CINEMATIC EXCELLENCE', canvas.width / 2, canvas.height / 2 + 100);

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  // Draw animated particles for video
  private drawAnimatedParticles(frameNumber: number, totalFrames: number) {
    const { ctx, canvas } = this;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const seed = i * 137.5; // Golden angle for distribution
      const phase = ((frameNumber + seed) / totalFrames) % 1;

      const x = (Math.sin(seed) * 0.5 + 0.5) * canvas.width;
      const y = phase * canvas.height;
      const size = Math.sin(phase * Math.PI) * 3 + 1;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${1 - phase})`;
      ctx.fill();
    }
  }

  // Generate SVG placeholder for immediate display
  static generateSVGPlaceholder(
    width: number,
    height: number,
    text: string,
    bgColor: string = '#1A1A1A'
  ): string {
    return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='${width}' height='${height}' fill='${encodeURIComponent(bgColor)}'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%234A4A4A' font-family='Inter' font-size='48' font-weight='bold'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
  }

  // Create canvas-based video blob (for client-side generation)
  async generateVideoBlob(
    duration: number = 10,
    fps: number = 30
  ): Promise<Blob | null> {
    if (typeof window === 'undefined') return null;

    const totalFrames = duration * fps;
    const frames: Blob[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const imageData = this.generateVideoFrame(i, totalFrames);

      // Convert ImageData to Blob
      this.ctx.putImageData(imageData, 0, 0);
      const blob = await new Promise<Blob | null>(resolve => {
        this.canvas.toBlob(blob => resolve(blob), 'image/webp', 0.8);
      });

      if (blob) frames.push(blob);
    }

    // Note: Actual video encoding would require a library like ffmpeg.js
    // For now, we return the first frame as a placeholder
    return frames[0] || null;
  }
}

// Project-specific color palettes for dynamic theming
export const projectPalettes = {
  jollibee: { primary: '#E84141', secondary: '#FFC72C', accent: '#ffffff' },
  bdo: { primary: '#003A70', secondary: '#0066CC', accent: '#FFC72C' },
  samsung: { primary: '#1428A0', secondary: '#000000', accent: '#ffffff' },
  sanmiguel: { primary: '#C8102E', secondary: '#FFD700', accent: '#000000' },
  makatiMed: { primary: '#00A859', secondary: '#005EB8', accent: '#ffffff' },
  maxs: { primary: '#8B0000', secondary: '#FFD700', accent: '#ffffff' }
};

// Helper to get project colors
export function getProjectColors(projectId: string) {
  return projectPalettes[projectId as keyof typeof projectPalettes] || {
    primary: '#0066FF',
    secondary: '#E84141',
    accent: '#ffffff'
  };
}