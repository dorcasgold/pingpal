"use client";
import * as React from "react"
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { usePreferences } from "@/store/usePreferences";
import { useSound } from "use-sound";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"

const PreferencesTab = () => {
	const { setTheme } = useTheme();

	const { soundEnabled, setSoundEnabled } = usePreferences();
	const [playMouseClick] = useSound("/sounds/click.wav");
	const [playSoundOn] = useSound("/sounds/bell.mp3", { volume: 0.3 });
	const [playSoundOff] = useSound("/sounds/woosh.wav", { volume: 0.3 });

	return (
		<div className='flex flex-wrap gap-2 px-1 md:px-2'>
			 <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="dark:bg-[#2B273F] bg-[#282E33] text-white">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-white dark:rotate-0 dark:scale-100 " />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => { setTheme("light"); soundEnabled && playMouseClick();}}>
          Light
        </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => { setTheme("dark"); soundEnabled && playMouseClick();}}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setTheme("system"); soundEnabled && playMouseClick();}}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
			<Button
				className="dark:bg-[#2B273F] bg-[#282E33] text-white"
				variant={"outline"}
				size={"icon"}
				onClick={() => {
					setSoundEnabled(!soundEnabled);
					soundEnabled ? playSoundOff() : playSoundOn();
				}}
			>
				{soundEnabled ? (
					<Volume2 className='size-[1.2rem] ' />
				) : (
					<VolumeX className='size-[1.2rem] ' />
				)}
			</Button>
		</div>
	);
};
export default PreferencesTab;