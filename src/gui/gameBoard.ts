import { Card } from "../cards/card";
import { DirectionCard } from "../cards/directionCard";
import { DrawCard } from "../cards/drawCard";
import { NumberCard } from "../cards/numberCard";
import { SkipCard } from "../cards/skipCard";
import { WildCard } from "../cards/wildCard";
import { WildDrawCard } from "../cards/wildCardDraw";
import { Game } from "../game";

/**
 * visiualize the uno gamestate
 */
export class GameBoard {
  private ORIGINAL_CARD_WIDTH = 240;
  private ORIGINAL_CARD_HEIGHT = 360;

  private defaultSettings = {
    canvasHeight: 80 * 4,
    canvasWidth: 1280,
  };

  private cardsImage: HTMLImageElement = new Image();
  private context: CanvasRenderingContext2D;

  private factor: number = 0.2;

  constructor(game: Game, container: HTMLElement) {
    const canvas = document.createElement("canvas");
    canvas.height = this.defaultSettings.canvasHeight;
    canvas.width = this.defaultSettings.canvasWidth;
    this.context = canvas.getContext("2d");

    container.appendChild(canvas);

    this.cardsImage.addEventListener("load", () => {
      game.startGame(false);

      this.renderGameState(game);

      const id = window.setInterval(() => {
        game.playTurn();
        this.renderGameState(game);

        if (!game.isRunning()) {
          window.clearInterval(id);
        }
      }, 500);
    });

    this.cardsImage.src = "images/cards.svg";
  }

  public renderGameState(game: Game) {
    this.context.clearRect(0, 0, this.defaultSettings.canvasWidth,
      this.defaultSettings.canvasHeight);

    let y = 0;

    this.drawCardAt(0, 0, game.topCard);
    this.drawCardAt(0, 80, null);

    for (const player of game.players) {
      let x = 70;

      for (const card of player.hand) {
        this.drawCardAt(x, y, card);
        x += 40;
      }

      y += 80;
    }
  }

  private drawCardAt(x: number, y: number, card: Card): void {
    const coords = this.getCardsImageCoordinates(card);

    this.context.drawImage(
      /* image */ this.cardsImage,
      /* position in src */ coords.x * this.ORIGINAL_CARD_WIDTH, coords.y * this.ORIGINAL_CARD_HEIGHT,
      /* dimensions in src */ this.ORIGINAL_CARD_WIDTH + 2, this.ORIGINAL_CARD_HEIGHT + 2,
      /* position in dest */ x, y,
      /* dimensions in dest */this.ORIGINAL_CARD_WIDTH * this.factor, this.ORIGINAL_CARD_HEIGHT * this.factor);
  }

  private getCardsImageCoordinates(card: Card): { x: number, y: number } {
    if (card instanceof NumberCard) {
      return { x: (card as NumberCard).value, y: card.color };
    }

    if (card instanceof SkipCard) {
      return { x: 10, y: card.color };
    }

    if (card instanceof DirectionCard) {
      return { x: 11, y: card.color };
    }

    if (card instanceof DrawCard) {
      return { x: 12, y: card.color };
    }

    if (card instanceof WildCard) {
      return { x: 13, y: 0 };
    }

    if (card instanceof WildDrawCard) {
      return { x: 13, y: 4 };
    }
    return { x: 0, y: 4 };
  }
}
