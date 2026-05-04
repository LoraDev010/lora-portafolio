# CLAUDE.md — Personal Portfolio (Web + Mobile)

## IDENTITY

* Project Name: **Lora Portfolio**
* Goal: Portfolio personal para mostrar proyectos, habilidades y experiencia a reclutadores.
* Platforms:

  * Web: Angular 20
  * Mobile: Ionic (Angular)
* Stack:

  * Angular 20 (standalone APIs, signals)
  * Ionic (Angular)
  * TypeScript (strict)
  * CSS (vanilla, sin frameworks inicialmente)
* Future-ready:

  * Preparado para integrar backend / DB sin afectar lógica de negocio

---

## BUSINESS CONTEXT

Aplicación que presenta mi perfil profesional, proyectos, experiencia y contacto.
Debe ser rápida, clara y optimizada para reclutadores (web y mobile).

---

## ARCHITECTURE (STRICT)

### Style

* Layered architecture (inspirada en Clean/Hexagonal)
* Separación estricta de responsabilidades
* UI desacoplada de lógica de negocio

### Layers

1. **presentation (UI)**

   * Angular components, pages
   * Sin lógica de negocio

2. **application (use cases)**

   * Casos de uso
   * Orquesta la lógica

3. **domain**

   * Modelos
   * Reglas de negocio puras
   * SIN dependencias de Angular o Ionic

4. **infrastructure**

   * APIs (futuro)
   * storage / adapters

---

### Dependency Rules (CRITICAL)

* presentation → application
* application → domain
* infrastructure → application + domain
* domain → NO depende de nadie

❌ Nunca romper esta regla

---

## PROJECT STRUCTURE

```
src/
 ├── app/
 │   ├── core/                # servicios globales
 │   ├── shared/              # componentes reutilizables
 │   ├── features/
 │   │   ├── portfolio/
 │   │   │   ├── presentation/
 │   │   │   ├── application/
 │   │   │   ├── domain/
 │   │   │   └── infrastructure/
 │   │   └── about/
 │   └── layout/
```

---

## CODING CONVENTIONS

### General

* Clean Code obligatorio
* SOLID principles
* Código legible > código complejo

---

### Naming

#### Files

* kebab-case

  * `portfolio-page.component.ts`
  * `get-projects.use-case.ts`

#### Classes

* PascalCase

  * `GetProjectsUseCase`
  * `PortfolioComponent`

#### Variables

* camelCase

  * `projectList`
  * `isLoading`

#### Interfaces

* prefijo `I` (opcional consistente)

  * `IProject`

---

### Components

* Dumb components → solo UI
* Smart components → lógica mínima

---

### Services / Use Cases

* Toda lógica va en application layer
* NO lógica en componentes

---

## FRONTEND RULES (ANGULAR + IONIC)

* Usar Angular standalone components
* Preferir signals sobre RxJS cuando aplique
* Evitar lógica en templates
* Comunicación vía inputs/outputs o services

---

## STYLING

* Solo CSS (sin Tailwind, Bootstrap, etc.)
* Modular por componente
* Evitar estilos globales innecesarios

---

## TESTING (OBLIGATORIO)

### Tipos

* Unit tests:

  * domain
  * use cases

* Component tests:

  * rendering
  * interacción

---

### Reglas

* Tests claros y legibles
* No mocks innecesarios
* Cobertura mínima esperada: 70%+

---

## COMMANDS

### Run project

```bash
npm install
ng serve
```

### Run mobile

```bash
ionic serve
```

### Tests

```bash
npm run test
```

### Build

```bash
ng build
ionic build
```

---

## GIT & REPO

* Commits claros (conventional commits), usando siempre la extension de github cli: 

  * feat:
  * fix:
  * refactor:

* README obligatorio:

  * descripción
  * setup
  * decisiones técnicas

---

## RESTRICTIONS

❌ NO hacer:

* lógica de negocio en componentes
* dependencias innecesarias
* frameworks CSS
* código duplicado
* archivos no usados

---

## FUTURE EXTENSIONS

* Integración con backend (Node o Java)
* Base de datos
* Autenticación
* CMS personal

👉 Todo debe poder integrarse sin romper domain/application

---

## CLAUDE BEHAVIOR

Actúa como:

* Senior Frontend Developer
* Software Architect

Siempre:

* Respetar arquitectura
* No sobreingeniería
* Crear solo lo necesario
* Código limpio y mantenible

---

## OUTPUT RULES

* Código primero
* Explicación breve
* No texto innecesario

---

## SUCCESS CRITERIA

* Proyecto limpio
* Escalable
* Fácil de mantener
* Presentable para reclutadores

Objetivo final:
👉 parecer un proyecto de nivel empresa
