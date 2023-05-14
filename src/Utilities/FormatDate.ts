const FormatDate = (dateString: string): string  => {
    const date: Date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return date.toLocaleDateString('ru-RU', options);
}

export default FormatDate;
