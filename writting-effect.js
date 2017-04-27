function WritingEffect(params)
{
	function MergeRecursive(obj1, obj2)
	{
		for (var p in obj2)
		{
			obj1[p] = obj2[p];

			if (obj2[p].constructor==Object)
				obj1[p] = MergeRecursive(obj1[p], obj2[p]);
		}

		return obj1;
	}

	var WritingEffectIntervalID = null;

	var Default = {
		'speed': 25,
		'cursor_time': 1000,
		'cursor_html': '<span class="typed-cursor">|</span>',
		'attr': 'data-writing-effect',
	};

	params = MergeRecursive(Default, params||{});

	var elements = [];
	var all = document.getElementsByTagName('body')[0].getElementsByTagName('*');

	for(var i in all)
	{
		var element = all[i];

		if(typeof element.getAttribute !== 'undefined' && element.getAttribute(params.attr) !== null)
			elements.push(element);
	}

	WritingEffectIntervalID = window.setInterval(function()
	{
		var flag_continue = false;

		for(var i in elements)
		{
			if(!elements[i].hasAttribute('data-content'))
			{
				elements[i].setAttribute('data-content', elements[i].innerHTML);
				elements[i].setAttribute('data-cursor-time', params.cursor_time);

				elements[i].innerHTML = '<span></span> ' + params.cursor_html;
			}

			var wrapper_content = elements[i].getElementsByTagName('span')[0];
			var content = elements[i].getAttribute('data-content');
			var letter = content[0];

			if(typeof letter === 'undefined')
			{
				var cursor = wrapper_content.parentElement.getElementsByClassName('typed-cursor');

				if(cursor.length)
				{
					var cursor_time = parseInt(elements[i].getAttribute('data-cursor-time'));
				
					elements[i].setAttribute('data-cursor-time', cursor_time - params.speed);

					if(cursor_time > params.speed)
						flag_continue = true;
					else
						cursor[0].remove();
				}
			}
			else
			{
				elements[i].setAttribute('data-content', content.substr(1, content.length - 1));
				wrapper_content.innerHTML += letter;

				flag_continue = true;
			}
		}

		if(!flag_continue)
			return clearInterval(WritingEffectIntervalID);
	}, params.speed);
}