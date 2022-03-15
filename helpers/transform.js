function setPokemonBase(obj) {
	return {
		pokemonId : obj.id,
		name      : obj.name,
		gender    : obj.gender_rate !== -1 ? true : null,
		types     : obj.types
	};
}

module.exports = { setPokemonBase };
