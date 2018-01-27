'use strict';

const MAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const stringErrors = (target, {required, minLength, maxLength, regex}, modelName) => {
	function * stringErrorGenerator() {
		if (!required && (target === '' || target === undefined)) {
			return;
		}
		if (required && !target) {
			yield `${modelName} is required`;
		}
		if (typeof target !== 'string') {
			yield `${modelName} is not string`;
			return;
		}
		if (minLength && minLength > target.length) {
			yield `${modelName} should be at least ${minLength} characters`;
		}
		if (maxLength && maxLength < target.length) {
			yield `${modelName} shouldn't be more than ${maxLength} characters`;
		}
		if (regex && !regex.text(target)) {
			yield `${modelName} is invalid string`;
		}
	}
	return [...stringErrorGenerator()];
};

const mailErrors = (mail, modelName = 'Mail') => {
	return stringErrors(
    mail,
		{
			required: true,
			regex: MAIL_REGEX
		},
    modelName
  );
};

const uuidErrors = (uuid, modelName = 'UUID') => {
	return stringErrors(
    uuid,
		{
			required: true,
			regex: UUID_REGEX
		},
    modelName
  );
};

module.exports = {stringErrors, mailErrors, uuidErrors};
