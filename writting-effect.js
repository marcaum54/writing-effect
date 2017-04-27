function WritingEffect(speed)
{
	if(!speed)
		speed = 25;

	var elements = [];
	var all = document.getElementsByTagName('body')[0].getElementsByTagName('*');

	for(var i in all)
	{
		var element = all[i];

		if(typeof element.getAttribute !== 'undefined' && element.getAttribute('data-writing-effect') !== null)
			elements.push(element);
	}

	var WritingEffectIntervalID = window.setInterval(function()
	{
		var flag_clear_interval = false;

		for(var i in elements)
		{
			if(!elements[i].hasAttribute('data-content'))
			{
				if(!elements[i].hasAttribute('data-cursor-html'))
					elements[i].setAttribute('data-cursor-html', "<strong class='typed-cursor'>|</strong>");

				if(!elements[i].hasAttribute('data-cursor-time'))
					elements[i].setAttribute('data-cursor-time', 1000);

				elements[i].setAttribute('data-content', elements[i].innerHTML);
				elements[i].innerHTML = '<span></span> ' + elements[i].getAttribute('data-cursor-html');
			}

			var wrapper_content = elements[i].getElementsByTagName('span')[0];
			var cursor = elements[i].getElementsByClassName('typed-cursor');

			if(cursor.length)
			{
				flag_clear_interval = true;
				var content = elements[i].getAttribute('data-content');
				var letter = content[0];

				if(letter)
				{
					elements[i].setAttribute('data-content', content.substr(1, content.length - 1));
					wrapper_content.innerHTML += letter;
				}
				else
				{
					var cursor_time = parseInt(elements[i].getAttribute('data-cursor-time')) - speed;
					elements[i].setAttribute('data-cursor-time', cursor_time);

					if(cursor_time <= 0)
					{
						cursor[0].remove();
						flag_clear_interval = false;
					}
				}
			}
		}

		if(!flag_clear_interval)
			return clearInterval(WritingEffectIntervalID);
	}, speed);
}
