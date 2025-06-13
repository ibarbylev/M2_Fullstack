В MySQL есть два типа данных, которые могут автоматически изменяться при изменении времени сервера:

    TIMESTAMP
    DATETIME (при использовании DEFAULT CURRENT_TIMESTAMP или ON UPDATE CURRENT_TIMESTAMP)

1. TIMESTAMP

Этот тип данных хранит дату и время в виде количества секунд с 1 января 1970 года (Unix-время) и автоматически изменяется при смене часового пояса сервера.

Пример:
```
CREATE TABLE example (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
    created_at сохранит момент вставки записи.
    updated_at обновится автоматически при каждом изменении записи.
    Если изменить часовой пояс сервера (SET time_zone = '+3:00';), 
    то TIMESTAMP будет показывать обновленное время в новом часовом поясе.

2. DATETIME

Этот тип не зависит от часового пояса и хранит дату/время как есть. 
Однако, если вы добавите CURRENT_TIMESTAMP, он может обновляться автоматически, но без привязки к часовому поясу.

Пример:
```
CREATE TABLE example (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
    created_at сохранит дату и время вставки.
    updated_at автоматически изменится при обновлении строки.
    При смене времени сервера это поле не изменится, в отличие от TIMESTAMP.

Итог

    TIMESTAMP меняется при изменении часового пояса сервера.
    DATETIME остается неизменным при смене часового пояса, но может обновляться 
    при изменении строки, если указаны DEFAULT CURRENT_TIMESTAMP или ON UPDATE CURRENT_TIMESTAMP.

Если важна независимость от времени сервера, лучше использовать DATETIME. 
Если важно учитывать смену часового пояса, то TIMESTAMP будет предпочтительнее.


