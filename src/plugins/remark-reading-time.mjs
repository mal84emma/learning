import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';

export function remarkReadingTime() {
	return (tree, { data }) => {
		const text = toString(tree);
		const stats = readingTime(text);
		data.astro.frontmatter.readingTime = stats.text;
	};
}
