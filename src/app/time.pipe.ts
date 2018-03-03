import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
	name: 'time'
})

export class TimePipe implements PipeTransform{
	transform (inp) {
		let result;
		let minutes = Math.trunc(inp / 600);
		let second = Math.trunc((inp%600)/10);
		let dec_sec = inp%10;
		if (minutes < 1) {
		result = ''+second+'.'+dec_sec;			
		} else {
		result = ''+ minutes + ' : '+second;
		}

		return result;
	}
}