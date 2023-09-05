const messagePageNotFound = 'Запрашиваемая страница не найдена.';
const messageWrongEmail = 'Неправильный формат Email.';
const messageWrongURL = 'Неправильный формат URL-адреса.';
const messageWrongRequest = 'При выполнении запроса возникли ошибки.';
const messageConflictRequest = 'При сохранении возникли конфликты.';
const messageForbidden = 'Недостаточно прав для выполнения операции.';
const messageServerError = 'На сервере возникла непредвиденная ошибка.';
const messageReqAuth = 'Для продолжения необходимо авторизоваться.';
const messageNotFoundUser = 'Не найден пользователь по указанному id:';
const messageWrongIdUser = 'Указан некорректный id:';
const messageWrongData = 'При создании пользователя переданы некорректные данные.';
const messageExistEmail = '- указанный Email  уже зарегистрирован.';
const messageWrongUpdateData = 'При обновлении пользователя переданы некорректные данные: ';
const messageWrongAuth = 'Передан неверный логин или пароль.';
const messageWrongMovie = 'При добавления фильма в избранные переданы некорректные данные.';
const messageNotFoundMovie = 'Не найдены фильмы по указанному ID: ';
const messageRemoveForbidden = '- удаление фильма из избранных недоступно. Так как фильм помещен в избранное не вашим пользователем -';
const messageWrongMovieRemove = 'При удалении фильма из избранных переданы некорректные данные: ';

module.exports = {
  messagePageNotFound,
  messageWrongEmail,
  messageWrongURL,
  messageWrongRequest,
  messageConflictRequest,
  messageForbidden,
  messageServerError,
  messageReqAuth,
  messageNotFoundUser,
  messageWrongIdUser,
  messageWrongData,
  messageExistEmail,
  messageWrongUpdateData,
  messageWrongAuth,
  messageWrongMovie,
  messageNotFoundMovie,
  messageRemoveForbidden,
  messageWrongMovieRemove,
};
