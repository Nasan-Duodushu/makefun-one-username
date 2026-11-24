// One Word, One Username, One Reward — the entrant's own make.fun handle,
// one word and nothing else, at most 30 characters. Writes it to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

class HandleEmitter {
  private readonly dir = "/output";
  private readonly file = "/output/entry.txt";

  private measure(text: string): number {
    const n = [...text].length;
    if (n < 1 || n > 30) {
      throw new Error(`handle is ${n} chars, must be 1-30`);
    }
    if (text.split(/\s+/).length !== 1) {
      throw new Error("handle must be a single word");
    }
    return n;
  }

  async run(text: string): Promise<void> {
    const n = this.measure(text);
    await mkdir(this.dir, { recursive: true });
    await writeFile(this.file, text, { encoding: "utf8" });
    console.log(`wrote ${n} chars to ${this.file}`);
  }
}

const HANDLE = "keen-comet-38-2238";

await new HandleEmitter().run(HANDLE);
