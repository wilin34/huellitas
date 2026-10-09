/* ============ ACORDEÓN DE SERVICIOS ============ */
.srv-card {
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0;
    overflow: hidden;
}

.srv-card .srv-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px 26px;
    transition: background 0.3s ease;
    position: relative;
}

.srv-card .srv-header .srv-icon {
    width: 54px;
    height: 54px;
    font-size: 26px;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--primary-light), #D4F5EA);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin: 0;
    transition: transform 0.3s ease;
}

.srv-card .srv-header h3 {
    font-family: "Outfit", sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: var(--ink);
    flex: 1;
    transition: color 0.3s ease;
}

.srv-toggle {
    font-size: 28px;
    font-weight: 300;
    color: var(--primary);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--primary-light);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    line-height: 1;
}

.srv-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.srv-card:hover .srv-header .srv-icon {
    transform: scale(1.1) rotate(-5deg);
}

.srv-card.active {
    box-shadow: 0 20px 45px rgba(0, 184, 148, 0.18);
    border-color: var(--primary);
}

.srv-card.active .srv-header {
    background: linear-gradient(135deg, var(--primary-light), #D4F5EA);
}

.srv-card.active .srv-header h3 {
    color: var(--primary-dark);
}

.srv-card.active .srv-toggle {
    transform: rotate(135deg);
    background: var(--primary);
    color: var(--white);
}

.srv-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), padding 0.35s ease;
    padding: 0 26px;
    border-top: 1px solid transparent;
}

.srv-card.active .srv-body {
    max-height: 500px;
    padding: 20px 26px 26px;
    border-top: 1px solid var(--line);
}

.srv-body p {
    font-size: 14.5px;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 16px;
}

.srv-body .srv-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
}

.srv-body .srv-list li {
    font-size: 13.5px;
    color: var(--muted);
    padding-left: 22px;
    position: relative;
    line-height: 1.5;
}

.srv-body .srv-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary);
    font-weight: 800;
}

.srv-cta {
    padding: 12px 22px;
    font-size: 14px;
    margin-top: 4px;
}

/* Efecto de gradiente inferior solo cuando está activo */
.srv-card::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
    border-radius: 0 0 20px 20px;
}

.srv-card.active::after {
    transform: scaleX(1);
}
