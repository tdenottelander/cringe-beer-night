export interface Beer {
  id: number;
  name: string;
  brewery: string;
  style: string;
  revealed: boolean;
  imageUrl?: string;
  description: string;
  mystery?: boolean;
}

export interface Team {
  id: number;
  name: string;
  aura: number;
}

export interface GekkieGameItem {
  id: number;
  screenshotUrl: string;
  videoUrl: string;
  title: string;
}
