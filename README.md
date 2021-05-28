# MUTE APP

## Spis treści

-   [Instalacja](#instalacja)
-   [Screenshoty](#screenshoty)
-   [SOLID](#SOLID)
-   [Wzorce projektowe](#wzorce-projektowe)

## Instalacja

Aplikacja jest do pobrania [tutaj]()

## Screenshoty

<div style="width:100%; display:flex; justify-content:space-between;">
<img src="https://i.imgur.com/3KaT5qO.png" alt="Mapa" width="200"/>
<img src="https://i.imgur.com/Q7021i5.png" alt="Modal" width="200"/>
<img src="https://i.imgur.com/di78cd5.png" alt="Lista lokalizacji" width="200"/>
</div>

## SOLID

-   S - Każdy [komponent](https://github.com/dolidius/Mute-phone-app/tree/1.0.0/components) w naszej apce jest odpowiedzialny za tylko jedną rzecz. Na przykład komponent [MutedLocalizationsItem]() pokazuje informacje o pojedynczej wyciszonej lokalizacji na liście, albo komponent [DayPicker]() pozwala użytkownikowi na wybranie jednego dnia tygodnia.
-   O - Każdy komponent w naszej aplikacji działa na bazie 'propsów' czyli wartości przekazywanych między rodzicem i jego dzieckiem. Np. komponent [DayPicker]() otrzymuje funkcję onCancel, która może być zdefiniowana w dowolny sposób w różnych miejscach, co umożliwia dodawanie funkcjonalności, bez potrzeby modyfikacji. Ponadto, najlepszym przykładem na 'O' w apce jest komponent [Screens](), który pozwala na dodanie nowych routów nawigacji bez potrzeby modyfikacji istniejącego kodu.
-   L - Nasza aplikacja używa OOP w bardzo małym stopniu bez potrzeby dziedziczenia.
-   I - Wszystkie [interfejsy]() w kodzie są podzielone na dużo małych. Np. interfejs [Localizations]() zamiast mieć w sobie wszystkie fieldy adresu, używa dodatkowego interfejsu Address.
-   D - Nasze komponenty polegają na funkcjach które zdefiniowane są gdzie indziej i tylko je wywołuja, a implementacja ukryta jest w innym miejscu. Np. w [App]() na starcie aplikacji wywoływane są 3 funkcje wczytujące interesujące nas dane:

```javascript
useEffect(() => {
    loadAllLocalizations();
    loadIntervals();
    loadSettings();
}, []);
```

## Wzorce projektowe

### Flux pattern

![Flux](https://i.pinimg.com/originals/b8/24/08/b82408c417ba88355f0307ff19f78cff.gif)
Bazą naszej aplikacji jest Flux pattern, który polega na tym że przepływ zmiennych pomiędzy komponentami dzieje się w storach. Każdy komponent w dowolnym momencie jest w stanie używać funkcje i zmienne które są w nim zdefiniowane. W naszym kodzie:

-   View: [Komponenty]()
-   Store: [Miejsce w którym jest przechowywany state aplikacji]()
-   Action: Funkcje wywołujące dispatcher
-   Dispatcher: Powodują zmiane state aplikacji

### Conditional rendering pattern
Jest to pattern który polega na renderowaniu komponentów jedynie przy spełnieniu jakichś założeń. Np. w [Map]() chcemy renderować LocalizationModal tylko i wyłącznie jeśli wartość poi istnieje. 

```javascript
{
    poi && (
        <LocalizationModal
            isClosed={isLocModalOpened}
            closeModal={setLocModalOpened}
            placeId={poi.placeId}
            coordinates={poi.coordinate}
        />
    );
}
```

Pomaga to w utrzymaniu czystości kodu, nie trzeba zwracać kilka razy różnych elementów w zależnośći od zmiennych, zamiast tego jest to rozwiązane w ten prosty sposób
