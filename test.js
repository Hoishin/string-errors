import test from 'ava';
import {stringErrors} from '.';

test('Non-required validation', t => {
	const nonRequired = target => stringErrors(target, {required: false}, 'test');
	t.deepEqual(nonRequired(''), []);
});
